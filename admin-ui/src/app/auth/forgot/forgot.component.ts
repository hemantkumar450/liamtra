import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from './../../shared/route.service';
import { UserModel } from '../login/login.model';
import { Message } from 'primeng/primeng';
import { AuthService } from '../auth.service';
import { LoginEnum } from '../../component/shared/enum/base.enum';
import { LocalStorageService } from '../../core/service/index';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})

export class ForgotPasswordComponent {

  public message: Message[] = [];
  public forgotPassword = new UserModel();
  isLoginFail: any;
  otp: number;
  emailVerifyBlock: boolean = false;
  otpVerifyBlock: boolean = false;
  forgetPasswordBlock: boolean = true;
  changePasswordBlock: boolean = false;
  rePassword: string = '';
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  tokenLink: string = '';
  isEmailBlock: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    public routeService: RouteService,
    private authenticationService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.tokenLink = this.route.snapshot.queryParams['token'] || null;
    this.forgotPassword.userName = this.route.snapshot.queryParams['email'] || null;
    if (this.tokenLink && this.forgotPassword.userName) {
      this.emailLinkVerification();
    }
  }

  public onLogin() {
    this.router.navigate(['auth/login']);
  }

  emailLinkVerification() {
    this.authenticationService.emailLinkVerification(this.forgotPassword.userName, this.tokenLink).then(response => {
      this.changePasswordBlock = true;
      this.forgetPasswordBlock = false;
    });

  }



  forgetPasssword() {
    this.emailVerifyBlock = false;
    this.otpVerifyBlock = false;
    let errorCount = 0;
    if (this.emailPattern.test(this.forgotPassword.userName)) {
      this.isEmailBlock = true;
    } else {
      errorCount++;
    }

    if (this.phonenoPattern.test(this.forgotPassword.userName)) {
      this.isEmailBlock = false;
    } else {
      errorCount++;
    }

    if (errorCount === 2) {
      this.forgetPasswordBlock = true;
      this.emailVerifyBlock = false;
      this.otpVerifyBlock = false;
      this.message.push({
        severity: 'error',
        summary: 'error Message', detail: 'check your emailId/Phone-no'
      });
      return;
    }

    try {
      this.authenticationService
        .resetPassword(this.forgotPassword.userName).then(res => {
          if (res.data.Result) {
            if (this.isEmailBlock) {
              this.emailVerifyBlock = true;
            } else {
              this.otpVerifyBlock = true;
            }
            this.forgetPasswordBlock = false;
          } else {
            this.message.push({
              severity: 'error',
              summary: 'error Message', detail: 'check your email for reset password link'
            });
            this.forgetPasswordBlock = true;
            this.emailVerifyBlock = false;
            this.otpVerifyBlock = false;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  changeBlockVisiblity(type) {
    this.forgotPassword.userName = '';
    this.changePasswordBlock = false;
    this.forgetPasswordBlock = false;
    // this.loginBlock = false;
    switch (type) {
      case 'loginBlock':
        this.router.navigate(['auth/login']);
        return;
      case 'forgetPasswordBlock':
        this.forgetPasswordBlock = true;
        return;
    }

  }

  otpVerify() {
    if (this.otp.toString().length !== 6) {
      this.message.push({ severity: 'error', summary: 'error Message', detail: 'OTP should be of 6 digits' });
      return;
    }
    try {
      this.authenticationService.validatePhoneOtp(this.forgotPassword.userName, this.otp).then(res => {
        if (res.data.Result) {
          this.changePasswordBlock = true;
          this.otpVerifyBlock = false;
        } else {
          this.message.push({ severity: 'error', summary: 'error Message', detail: 'error' });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  changePasswordEvent() {
    if (this.forgotPassword.password !== this.rePassword) {
      this.message.push({ severity: 'error', summary: 'error Message', detail: 'Password & Confirm Password should be same.' });
      return;
    }

    if (this.forgotPassword.password.length < 6) {
      this.message.push({ severity: 'error', summary: 'error Message', detail: 'Password should be more than 6 words.' });
      return;
    }
    try {
      let obj = {
        userName: this.forgotPassword.userName,
        userPwd: this.forgotPassword.password
      }
      this.authenticationService.changePassword(obj).then(response => {
        if (response.data.Result) {
          this.forgotPassword.provider = LoginEnum.AdminPanel;
          this.authenticationService.login(this.forgotPassword).then(res => {
            let token = res;
            if (token) {
              this.localStorageService.setCurrentUser(token);
            }
            this.setCurrentUser();
          });
        } else {
          this.message.push({ severity: 'error', summary: 'error Message', detail: 'error' });
        }
      })
    } catch (e) {
      console.log(e);
    }
  }


  setCurrentUser() {
    const splitUrl = '';
    this.localStorageService.setModuleName(splitUrl);
    this.router.navigate(['']);
  }
}

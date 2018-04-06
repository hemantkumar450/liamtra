import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../core/service/index';
import { UserModel, Token } from './login.model';
import { RouteService } from '../../shared/route.service'
import { LoginEnum } from '../../component/shared/enum/base.enum';
export enum Color {
  default = 1,
  warn = 0,
  success = 2
}
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../../shared/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userDetail: UserModel = new UserModel();
  public token: any;
  public returnUrl: string;
  public defaultMenu = '';
  public moduleName = 'serviceCategory';
  public isUserTextBoxBlank = Color.default;
  public isPasswordTextBoxBlank = Color.default;
  public isLoginFail = false;
  public isSubmitted = false;
  private subscription: Subscription;


  constructor(private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private routeService: RouteService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    const currentUser = this.localStorageService.getCurrentUser();
    if (currentUser) {
      if (this.localStorageService.getModuleName()) {
        this.moduleName = this.localStorageService.getModuleName();

        const selectedModule = this.routeService.topModuleMenus(this.moduleName);
      }

      this.router.navigate([this.returnUrl]);
    } else {
      // reset login status
      this.localStorageService.removeLogin();
      this.returnUrl = '/' + this.moduleName + '/' + this.defaultMenu;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
    }
  }


  onLogin(data) {
    this.userDetail.provider = LoginEnum.AdminPanel;
    this.userDetail.accessToken = ''
    this.authService.login(this.userDetail).then(res => {
      this.token = res;
      if (this.token && this.token.AccessToken) {
        this.localStorageService.setCurrentUser(this.token);
      }
      this.setCurrentUser()
    });
  }

  forgotPassword() {
    this.router.navigate(['auth/forgotPassword']);
  }

  checkUserRole() {
    return '/' + this.moduleName + '/' + this.defaultMenu;
  }

  setCurrentUser() {
    this.returnUrl = this.checkUserRole();
    const splitUrl = this.returnUrl.split('/')[1];
    if (splitUrl) {
      this.localStorageService.setModuleName(splitUrl);
    }
    this.router.navigate(['']);
  }
}

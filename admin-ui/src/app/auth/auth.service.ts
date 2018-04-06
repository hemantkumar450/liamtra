import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler,
  ArrayResponseModel,
  AsyncArrayPromiseHandler,
  AsyncObjectPromiseHandler
} from '../component/shared/models/base-data.model';
import { Token } from './+login/login.model';
import { ApiUrl } from '../shared/api.service';
import { UserModel } from './login/login.model';
import { ForgotPasswordModel } from './forgot/forgot.model';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: Http,
    private jsonp: Jsonp) { }

  public login(userDetail: UserModel): Promise<any> {
    const logInfo = JSON.stringify(userDetail)
    const promise = this.http
      .post(ApiUrl.LOGIN_URI + 'Login', logInfo)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getIp(): Promise<any> {
    const promise = this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
      .toPromise();
    return new PromiseHandler<any>(promise);
  };

  resetPassword(item): Promise<ObjectResponseModel<any>> {
    const promise = this.http.get(ApiUrl.LOGIN_URI + 'User/resetPassword/' + item + '?isAdmin=true');
    return new AsyncObjectPromiseHandler<any>(promise.toPromise());
  }

  validatePhoneOtp(phoneNo, otp): Promise<ObjectResponseModel<ForgotPasswordModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ValidateUser/verifyAccount/' + otp + '?phone=' + phoneNo);
    return new AsyncObjectPromiseHandler<ForgotPasswordModel>(promise.toPromise());
  }

  changePassword(data): Promise<ObjectResponseModel<any>> {
    const promise = this.http.put(ApiUrl.LOGIN_URI + 'User/updatePassword', data);
    return new AsyncObjectPromiseHandler<any>(promise.toPromise());
  }

  emailLinkVerification(email, link): Promise<ObjectResponseModel<any>> {
    const promise = this.http
        .get(ApiUrl.MASTER_URI + 'ValidateUser/verifyAccount/' + link + '?email=' + email);
    return new AsyncObjectPromiseHandler<any>(promise.toPromise());
}

  logout(): void {
    this.isLoggedIn = false;
  }
}

import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// import { ResetPasswordModel } from '../../reset-password/reset-password.model';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {
  ObjectResponseModel,
  PostObjectResponseModel,
  ArrayResponseModel,
  AsyncArrayPromiseHandler,
  AsyncObjectPromiseHandler,
  PromiseHandler
} from '../../shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
import { UserModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service'



@Injectable()
export class UserService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getUserList(): Promise<ArrayResponseModel<UserModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'User/list');
    return new AsyncArrayPromiseHandler<UserModel>(promise.toPromise());
  }

  async getUserDetailsById(Id): Promise<ObjectResponseModel<UserModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'User/get/' + Id);
    return new AsyncObjectPromiseHandler<UserModel>(promise.toPromise());
  }


  // async getUserServiceType(userTypeId): Promise<ArrayResponseModel<UserModel>> {
  //   const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + userTypeId);
  //   return new AsyncArrayPromiseHandler<UserModel>(promise.toPromise());
  // }

  // async getUserStatus(userStatus): Promise<ArrayResponseModel<UserModel>> {
  //   const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + userStatus);
  //   return new AsyncArrayPromiseHandler<UserModel>(promise.toPromise());
  // }

  async getServiceTypeList(): Promise<ArrayResponseModel<any>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceType/list');
    return new AsyncArrayPromiseHandler<any>(promise.toPromise());
  }




  saveUserDetails(data): Promise<ObjectResponseModel<UserModel>> {
    let promise = this.http
      .post(ApiUrl.MASTER_URI + 'User', data);
    if (Number(data.userId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'User', data);
    }
    return new AsyncObjectPromiseHandler<UserModel>(promise.toPromise());
  }

  // updateUserDetails(data): Promise<ObjectResponseModel<UserModel>> {
  //   let promise = this.http
  //     .put(ApiUrl.MASTER_URI + 'User', data);
  //   if (Number(data.storeLocationTaxID) > 0) {
  //     promise = this.http
  //       .put(ApiUrl.serverUrl + 'StoreLocationTax/Update', data);
  //   }
  //   return new AsyncObjectPromiseHandler<UserModel>(promise.toPromise());
  // }
  deleteUserDetails(id): Promise<ObjectResponseModel<UserModel>> {
    const promise = this.http
      .delete(ApiUrl.MASTER_URI + 'User/' + id);

    return new AsyncObjectPromiseHandler<UserModel>(promise.toPromise());
  }
}

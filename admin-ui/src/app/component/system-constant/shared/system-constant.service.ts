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
  AsyncObjectPromiseHandler
} from '../../shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
import { SystemConstantModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service'
import { ServiceCategoryModel } from '../../../component/service-category/index';


@Injectable()
export class SystemConstantService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getSystemConstantList(): Promise<ArrayResponseModel<SystemConstantModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'SystemConstant/getAllIndex');
    return new AsyncArrayPromiseHandler<SystemConstantModel>(promise.toPromise());
  }

  async saveSystemConstant(data: SystemConstantModel): Promise<ObjectResponseModel<SystemConstantModel>> {
    let promise = this.http
      .post(ApiUrl.MASTER_URI + 'SystemConstant', data);
    if (Number(data.sysConstantId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'SystemConstant', data);
    }
    return new AsyncObjectPromiseHandler<SystemConstantModel>(promise.toPromise());
  }

  async deleteSystemConstantDetails(id): Promise<ObjectResponseModel<SystemConstantModel>> {
    let promise = this.http
      .delete(ApiUrl.MASTER_URI + 'StoreLocationTax/AddNew/' + id);

    return new AsyncObjectPromiseHandler<SystemConstantModel>(promise.toPromise());
  }
  async getSystemConstantById(id): Promise<ObjectResponseModel<SystemConstantModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'SystemConstant/get/' + id);
    return new AsyncObjectPromiseHandler<SystemConstantModel>(promise.toPromise());
  }

  async getServiceCategoryList(): Promise<ArrayResponseModel<ServiceCategoryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceCategory/list');
    return new AsyncArrayPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  }


}

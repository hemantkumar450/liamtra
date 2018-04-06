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
import { ServiceCategoryModel, ServiceSubCategoryModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service'



@Injectable()
export class ServiceCategoryService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getServiceCategoryList(): Promise<ArrayResponseModel<ServiceCategoryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceCategory/list');
    return new AsyncArrayPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  }

  async getServiceCategoryById(id): Promise<ObjectResponseModel<ServiceCategoryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceCategory/get/' + id);
    return new AsyncObjectPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  }

  saveServiceCategoryDetails(data: ServiceCategoryModel): Promise<ObjectResponseModel<ServiceCategoryModel>> {
    let promise = null;
    if (Number(data.svcCatgId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'ServiceCategory', data);
    } else {
      promise = this.http
        .post(ApiUrl.MASTER_URI + 'ServiceCategory', data);
    }
    return new AsyncObjectPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  }

  deleteServiceCategoryDetails(id): Promise<ObjectResponseModel<ServiceCategoryModel>> {
    let promise = this.http
      .delete(ApiUrl.MASTER_URI + 'ServiceCategory/' + id);

    return new AsyncObjectPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  }

  deleteServiceSubCategoryDetails(id): Promise<ObjectResponseModel<ServiceSubCategoryModel>> {
    let promise = this.http
      .delete(ApiUrl.MASTER_URI + 'ServiceSubCategory/' + id);

    return new AsyncObjectPromiseHandler<ServiceSubCategoryModel>(promise.toPromise());
  }



}

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
import { ServiceTypeModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service'
import { ServiceCategoryModel } from '../../serviceCategory/index';


@Injectable()
export class ServiceTypeService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getServiceTypeList(): Promise<ArrayResponseModel<ServiceTypeModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceType/list');
    return new AsyncArrayPromiseHandler<ServiceTypeModel>(promise.toPromise());
  }

 async saveServiceType(data:ServiceTypeModel): Promise<ObjectResponseModel<ServiceTypeModel>> {
    let promise = this.http
      .post(ApiUrl.MASTER_URI + 'ServiceType', data);
    if (Number(data.svcTypeId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'ServiceType', data);
    }
    return new AsyncObjectPromiseHandler<ServiceTypeModel>(promise.toPromise());
  }

 async deleteServiceTypeDetails(id): Promise<ObjectResponseModel<ServiceTypeModel>> {
    let promise = this.http
      .delete(ApiUrl.MASTER_URI + 'ServiceType/' + id);

    return new AsyncObjectPromiseHandler<ServiceTypeModel>(promise.toPromise());
  }
  async getServiceTypeById(id): Promise<ObjectResponseModel<ServiceTypeModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceType/get/' + id);
    return new AsyncObjectPromiseHandler<ServiceTypeModel>(promise.toPromise());
  }

  // async getServiceCategoryList(): Promise<ArrayResponseModel<ServiceCategoryModel>> {
  //   const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceCategory/list');
  //   return new AsyncArrayPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  // }


}

import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import {
  BaseDataModel,
  ObjectResponseModel,
  PostObjectResponseModel,
  ArrayResponseModel,
  AsyncArrayPromiseHandler,
  AsyncObjectPromiseHandler
} from '../../shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
import { UniqueHomeModel, ServiceCatogory, ServiceSubCategory } from '../models/unique-home.model';
import { BookedUniqueHomeModel } from '../models/unique-booked-model';

@Injectable()
export class HostUniqueHomeService {
  constructor(private http: Http) { }

  getAllUniqueHomes(params): Promise<ObjectResponseModel<BaseDataModel<UniqueHomeModel>>> {
    const promise = this.http.get(ApiUrl.HOME_URI + 'HostService/list?Filter.svcTypeId=3', { params: params });
    return new AsyncObjectPromiseHandler<BaseDataModel<UniqueHomeModel>>(promise.toPromise());
  }

  getHostedHomeByBookingId(svcId): Promise<ObjectResponseModel<UniqueHomeModel>> {
    const promise = this.http.get(ApiUrl.HOME_URI + 'HostService/getBySvcId/' + svcId);
    return new AsyncObjectPromiseHandler<UniqueHomeModel>(promise.toPromise());
  }

  async getAllServiceCategory(): Promise<ArrayResponseModel<ServiceSubCategory>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/get');
    return new AsyncArrayPromiseHandler<ServiceSubCategory>(promise.toPromise());
  }

  saveHostDetail(data: UniqueHomeModel): Promise<ObjectResponseModel<UniqueHomeModel>> {
    let promise = null;

    promise = this.http
      .put(ApiUrl.MASTER_URI + 'HostService/UpdateList', data);

    return new AsyncObjectPromiseHandler<UniqueHomeModel>(promise.toPromise());
  }

}

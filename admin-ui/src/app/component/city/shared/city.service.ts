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
import { CityModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service'



@Injectable()
export class CityService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getCityList(stateId): Promise<ArrayResponseModel<CityModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'City/list/' + stateId);
    
    return new AsyncArrayPromiseHandler<CityModel>(promise.toPromise());
  }

  async getCityById(id): Promise<ObjectResponseModel<CityModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'City/get/' + id);
    return new AsyncObjectPromiseHandler<CityModel>(promise.toPromise());
  }

  async getCityDDO(): Promise<ObjectResponseModel<CityModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'City/get');
    return new AsyncObjectPromiseHandler<CityModel>(promise.toPromise());
  }


  saveCityDetail(data: CityModel): Promise<ObjectResponseModel<CityModel>> {
    let promise = null;
    if (Number(data.cityId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'City', data);
    } else {
      promise = this.http
        .post(ApiUrl.MASTER_URI + 'City', data);
    }
    return new AsyncObjectPromiseHandler<CityModel>(promise.toPromise());
  }

}

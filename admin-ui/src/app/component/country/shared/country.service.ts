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
import { CountryModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service';
  

@Injectable()
export class CountryService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getCountryList(): Promise<ArrayResponseModel<CountryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'Country/list');
    return new AsyncArrayPromiseHandler<CountryModel>(promise.toPromise());
  }

  async getCountryById(id): Promise<ObjectResponseModel<CountryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'Country/get/' + id);
    return new AsyncObjectPromiseHandler<CountryModel>(promise.toPromise());
  }

 


  saveCountryDetail(data: CountryModel): Promise<ObjectResponseModel<CountryModel>> {
    let promise = null;
    if (Number(data.countryId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'Country', data);
    } else {
      promise = this.http
        .post(ApiUrl.MASTER_URI + 'Country', data);
    }
    return new AsyncObjectPromiseHandler<CountryModel>(promise.toPromise());
  }

}

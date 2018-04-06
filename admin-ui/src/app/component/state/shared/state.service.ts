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
import { StateModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service'
import { ServiceCategoryModel } from '../../serviceCategory/index';
import { CountryModel } from '../../country/shared/index';

@Injectable()
export class StateService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getStateListByCountryId(countryId): Promise<ArrayResponseModel<StateModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'state/list/' + countryId);
    return new AsyncArrayPromiseHandler<StateModel>(promise.toPromise());
  }

  async getCountryList(): Promise<ArrayResponseModel<CountryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'Country/list');
    return new AsyncArrayPromiseHandler<CountryModel>(promise.toPromise());
  }

  async saveState(data: StateModel): Promise<ObjectResponseModel<StateModel>> {
    let promise = this.http
      .post(ApiUrl.MASTER_URI + 'State', data);
    if (Number(data.stateId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'State', data);
    }
    return new AsyncObjectPromiseHandler<StateModel>(promise.toPromise());
  }

  async deleteStateDetails(states): Promise<ObjectResponseModel<StateModel>> {
    const promise = this.http
      .put(ApiUrl.MASTER_URI + 'State/' , states);

    return new AsyncObjectPromiseHandler<StateModel>(promise.toPromise());
  }
  async getStateById(id): Promise<ObjectResponseModel<StateModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'State/get/' + id);
    return new AsyncObjectPromiseHandler<StateModel>(promise.toPromise());
  }

  // async getServiceCategoryList(): Promise<ArrayResponseModel<ServiceCategoryModel>> {
  //   const promise = this.http.get(ApiUrl.MASTER_URI + 'ServiceCategory/list');
  //   return new AsyncArrayPromiseHandler<ServiceCategoryModel>(promise.toPromise());
  // }


}

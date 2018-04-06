import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
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
import { ReviewModel } from './index';
import { LocalStorageService } from '../../../core/service/local-storage.service';
@Injectable()
export class ReviewService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getReviewList(): Promise<ArrayResponseModel<ReviewModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'Review/list');
    return new AsyncArrayPromiseHandler<ReviewModel>(promise.toPromise());
  }
  async getReviewById(Id): Promise<ObjectResponseModel<ReviewModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'Review/get/' + Id);
    return new AsyncObjectPromiseHandler<ReviewModel>(promise.toPromise());
  }
  updateReviewDetails(data): Promise<ObjectResponseModel<ReviewModel>> {
    let promise = this.http
      .put(ApiUrl.MASTER_URI + 'Review', data);
    if (Number(data.storeLocationTaxID) > 0) {
      promise = this.http
        .put(ApiUrl.serverUrl + 'StoreLocationTax/Update', data);
    }
    return new AsyncObjectPromiseHandler<ReviewModel>(promise.toPromise());
  }
}


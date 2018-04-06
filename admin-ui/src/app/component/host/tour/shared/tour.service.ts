import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { HostTourModel, AttachmentModel, HostTourInclusionModel, HostServiceCategoryModel } from './index';
// import { HostTourItenaryModel } from '../../../tour-itenary/shared/tour-itenary.model';
import {
  ObjectResponseModel,
  PostObjectResponseModel,
  ArrayResponseModel,
  AsyncArrayPromiseHandler,
  AsyncObjectPromiseHandler
} from '../../../shared/models/base-data.model';
import { ApiUrl } from '../../../../shared/api.service';
import { LocalStorageService } from '../../../../core/service/local-storage.service';
import { CustomDDO } from '../../../shared';
import { TourRouteModel } from '../../tour/tour-routes/tour-route.model';

@Injectable()
export class HostTourService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  async getToursList(): Promise<ArrayResponseModel<HostTourModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'HostTour/getAll');
    return new AsyncArrayPromiseHandler<HostTourModel>(promise.toPromise());
  }

  async getHostTourById(id): Promise<ObjectResponseModel<HostTourModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'HostTour/get/' + id);
    return new AsyncObjectPromiseHandler<HostTourModel>(promise.toPromise());
  }

  // async getTourItenaryListByTourId(tourId): Promise<ArrayResponseModel<HostTourItenaryModel>> {
  //   const promise = this.http.get(ApiUrl.MASTER_URI + 'HostTourItenary/getByTourId/' + tourId);
  //   return new AsyncArrayPromiseHandler<HostTourItenaryModel>(promise.toPromise());
  // }

  async getAllSvcidAndName(): Promise<Array<CustomDDO>> {

    const response = await this.http.get(ApiUrl.MASTER_URI + 'HostService/GetAllSvcidAndName').toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.svcName, value: item.svcId }
      results.push(obj);
    });
    return results;

  }
  //  PUT /api/HostTour/UpdateWithHostService

  saveHostTourDetail(data: HostTourModel): Promise<ObjectResponseModel<HostTourModel>> {
    let promise = null;
    if (Number(data.tourId) > 0) {
      promise = this.http
        .put(ApiUrl.MASTER_URI + 'HostTour/UpdateWithHostService', data);
    } else {
      promise = this.http
        .post(ApiUrl.MASTER_URI + 'HostTour', data);
    }
    return new AsyncObjectPromiseHandler<HostTourModel>(promise.toPromise());
  }

  async getAttchmentBySvcTypeTdAndTourId(svcId, svcTypeId): Promise<ArrayResponseModel<AttachmentModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'Attachment/getAttachmentsByGenIdAndSvcTypeId/' + svcId + '/' + svcTypeId);
    return new AsyncArrayPromiseHandler<AttachmentModel>(promise.toPromise());
  }


  updateByHostTour(data): Promise<ObjectResponseModel<AttachmentModel>> {
    let promise = null;

    promise = this.http
      .put(ApiUrl.MASTER_URI + 'Attachment/UpdateByHostTour', data);

    return new AsyncObjectPromiseHandler<AttachmentModel>(promise.toPromise());
  }

  async getSvcSubCategoryCodes(svcCatgId): Promise<Array<CustomDDO>> {

    const response = await this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + svcCatgId).toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.svcSCatgCode, value: item.svcSCatgId }
      results.push(obj);
    });
    return results;

  }

  async getTourSubCategoryList(svcId, categoryIds): Promise<ArrayResponseModel<HostServiceCategoryModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'HostTour/getSubCategoryBySvcID/' + svcId + '/' + categoryIds);
    return new AsyncArrayPromiseHandler<HostServiceCategoryModel>(promise.toPromise());
  }

  updateWithHostLinkingSubCategory(data: Array<HostServiceCategoryModel>): Promise<ObjectResponseModel<HostServiceCategoryModel>> {
    let promise = null;
    promise = this.http
      .put(ApiUrl.MASTER_URI + 'HostTour/updateWithHostLinkingSubCategory', data);

    return new AsyncObjectPromiseHandler<HostServiceCategoryModel>(promise.toPromise());
  }
  // GET /api/HostTourRoutes/GetByTourId/{tourId}
  async getAllRoutes(tourId): Promise<ArrayResponseModel<TourRouteModel>> {
    const promise = this.http.get(ApiUrl.MASTER_URI + 'HostTourRoutes/GetById/' + tourId);
    return new AsyncArrayPromiseHandler<TourRouteModel>(promise.toPromise());
  }


  saveHostTourRoute(data): Promise<ObjectResponseModel<TourRouteModel>> {
    // PUT / api / HostTourRoutes / UpdateList
    let promise = null;
    promise = this.http
      .put(ApiUrl.MASTER_URI + 'HostTourRoutes/UpdateList', data);

    return new AsyncObjectPromiseHandler<TourRouteModel>(promise.toPromise());
  }




}

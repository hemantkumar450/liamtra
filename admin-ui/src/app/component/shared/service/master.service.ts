import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { CustomDDO, SystemConstantModel } from '../../shared'
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler,
  ArrayResponseModel
} from '../../shared/models/base-data.model';
import { ReviewModel } from '../';
import { ApiUrl } from '../../../shared/api.service'
@Injectable()


export class MasterService {

  constructor(private http: Http) { }

  async getCountryDDO(): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'Country/listForCombo').toPromise();
    let data: any = response.json();
    let results: Array<CustomDDO> = [];
    data.map((item) => {
      let obj = { label: item.countryName, value: item.countryId }
      results.push(obj);
    });
    return results;
  }

  async getSystemConstantDDO(systemConstantId): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'SystemConstant/GetAllIndexByID/' + systemConstantId).toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.sysConstantDesc, value: item.sysConstantId }
      results.push(obj);
    });
    return results;
  }

  async getSystemConstantMainDDO(): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'SystemConstant/GetAllIndex').toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.sysConstantDesc, value: item.sysConstantId }
      results.push(obj);
    });
    return results;
  }

  async getStateDDO(countryId): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'State/listForCombo/' + countryId).toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.stateName, value: item.stateId }
      results.push(obj);
    });
    return results;
  }

  async getAllStateDDO(): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'State/list').toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    // data.map((item) => {
    //   const obj = { label: item.stateName, value: item.stateId }
    //   results.push(obj);
    // });
    // return results;
    data.map((item) => {
      item.label = item.stateName;
      item.value = item.stateId
    });
    return data;
  }

  async getCityDDO(stateId): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'City/list/' + stateId).toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.cityName, value: item.cityId }
      results.push(obj);
    });
    return results;
  }

  async getAllCityDDO(): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'City/list').toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    // data.map((item) => {
    //   const obj = { label: item.cityName, value: item.cityId }
    //   results.push(obj);
    // });
    data.map((item) => {
      item.label = item.cityName;
      item.value = item.cityId
    })
    return data;
  }

  async getUserStatus(userStatus): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + userStatus).toPromise();
    let data: any = response.json();
    let results: Array<CustomDDO> = [];
    data.map((item) => {
      let obj = { label: item.svcSCatgDesc, value: item.svcSCatgId }
      results.push(obj);
    });
    return results;
  }

  async getUserServiceType(userTypeId): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + userTypeId).toPromise();
    let data: any = response.json();
    let results: Array<CustomDDO> = [];
    data.map((item) => {
      let obj = { label: item.svcSCatgDesc, value: item.svcSCatgId }
      results.push(obj);
    });
    return results;
  }

  async getSCategoryType(userTypeId): Promise<Array<CustomDDO>> {
    const response = await this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + userTypeId).toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.svcSCatgDesc, value: item.svcSCatgId }
      results.push(obj);
    });
    return results;
  }

  async getReviewList(): Promise<Array<ReviewModel>> {
    const response = await this.http.get(ApiUrl.BOOKING_URI + 'Review/list').toPromise();
    const data: any = response.json();
    return data;
  }

  async getTourItenaryStatusList(): Promise<Array<CustomDDO>> {
    const data: any = [{ statusValue: 0, statusCode: '0' }, { statusValue: 1, statusCode: '1' }];
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.statusCode, value: item.statusValue }
      results.push(obj);
    });
    return results;
  }

  async getSvcSubCategoryCodes(svcCatgId): Promise<Array<CustomDDO>> {

    const response = await this.http.get(ApiUrl.MASTER_URI + 'ServiceSubCategory/list/' + svcCatgId).toPromise();
    const data: any = response.json();
    const results: Array<CustomDDO> = [];
    data.map((item) => {
      const obj = { label: item.svcSCatgDesc, value: item.svcSCatgId }
      results.push(obj);
    });
    return results;

  }





}

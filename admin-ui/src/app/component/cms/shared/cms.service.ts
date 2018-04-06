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
import { CmsListModel } from './cms.model';
import { SystemConstantModel } from '../../shared/models/system-constant.model';
import { LocalStorageService } from '../../../core/service/local-storage.service';
@Injectable()
export class CmsService {
    constructor(
        private http: Http,
        public localStorageService: LocalStorageService
    ) { }

    async getCmsList(): Promise<ArrayResponseModel<CmsListModel>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'Cms/GetAll');
        return new AsyncArrayPromiseHandler<CmsListModel>(promise.toPromise());
    }

    saveCmsDetail(data: CmsListModel): Promise<ObjectResponseModel<CmsListModel>> {
        let promise = null;
        if (Number(data.cmsId) > 0) {
            promise = this.http
                .put(ApiUrl.HOST_URI + 'CMS', data);
        } else {
            promise = this.http
                .post(ApiUrl.HOST_URI + 'CMS', data);
        }
        return new AsyncObjectPromiseHandler<CmsListModel>(promise.toPromise());
    }

    //    /api/CMS/GetByID/{cmsId}
    async getCMSById(id): Promise<ObjectResponseModel<CmsListModel>> {
        const promise = this.http.get(ApiUrl.MASTER_URI + 'CMS/GetByID/' + id);
        return new AsyncObjectPromiseHandler<CmsListModel>(promise.toPromise());
    }


}

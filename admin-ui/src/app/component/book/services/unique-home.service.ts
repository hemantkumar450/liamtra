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
export class BookedUniqueHomeService {
    constructor(private http: Http) { }

    getAllUniqueBookedHomes(params): Promise<ObjectResponseModel<BookedUniqueHomeModel[]>> {
        const promise = this.http.get(ApiUrl.HOME_URI + 'BookService/listByServiceType?Filter.svcTypeId=23', { params: params });
        return new AsyncObjectPromiseHandler<BookedUniqueHomeModel[]>(promise.toPromise());
    }

    getBookedHomeByBookingId(bookingId): Promise<ObjectResponseModel<BookedUniqueHomeModel>> {
        const promise = this.http.get(ApiUrl.HOME_URI + 'BookService/getBookStay/' + bookingId);
        return new AsyncObjectPromiseHandler<BookedUniqueHomeModel>(promise.toPromise());
    }
    // PUT /api/HostService / UpdateList
}

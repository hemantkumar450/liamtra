import { HostTourModel, HostService } from './tour.model';
import { HostTourInclusionModel, HostTourCategoryModel, HostTourSubCatagoryModel } from './tour-sub-category.model';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class HostTourData {
    hostTours: Array<HostTourModel> = [];
    hostTour: HostTourModel;

    incs: Array<HostTourInclusionModel> = [];
    inc: HostTourInclusionModel;

    cats: Array<HostTourCategoryModel> = [];
    cat: HostTourCategoryModel;

    subs: Array<HostTourSubCatagoryModel> = [];
    sub: HostTourSubCatagoryModel;

    constructor(
        private http: Http
    ) {

    }

    public getToursList() {
        this.hostTour = new HostTourModel();
    }
}

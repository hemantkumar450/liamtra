import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from '../../shared/utils/notification.service';
import { MessageService } from '../shared/message/messageService.service';
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component';
import {
    HostTourInclusionModel, HostTourCategoryModel,
    HostTourSubCatagoryModel, HostTourService,
    HostTourData, HostServiceCategoryModel, HostServiceLinkingSubCategoryModel
} from '../shared/index'

declare const $;

@Component({
    selector: 'app-host-tour-sub-category',
    templateUrl: './tour-sub-category.component.html',
    styleUrls: ['./tour-sub-category.component.css']
})

export class HostTourSubCategoryComponent implements OnInit {
    hostTourInclusions: HostTourInclusionModel = new HostTourInclusionModel();
    tourId = 0;
    svcId: number = 0;
    routeType: string = 'addNew';
    totalDB: number = 0;
    private sub1: any;
    moduleName: string = 'Tour Inclusions';
    header: string = 'Tour Categories';
    iconClass: string = 'fa fa-fw fa-plus txt-color-blue';
    categoryIds: string = '46,47,48,49,51';
    hostServiceCategoryModel: Array<HostServiceCategoryModel> = [];

    incs: Array<HostTourInclusionModel> = [];
    inc: HostTourInclusionModel;

    cats: Array<HostTourCategoryModel> = [];
    cat: HostTourCategoryModel;

    subs: Array<HostTourSubCatagoryModel> = [];
    subs1: Array<HostTourSubCatagoryModel> = [];
    sub: HostTourSubCatagoryModel;
    type: String = '';

    constructor(
        private router: Router,
        public route: ActivatedRoute,
        public hostTourService: HostTourService,
        public hostTourData: HostTourData,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.sub1 = this.route.parent.params.subscribe(params => {
            this.tourId = +params["tourId"];
            this.svcId = +params["svcId"];
            if (this.tourId > 0) {
                this.routeType = 'entry';
            } else {
                this.routeType = 'addNew';
            }
            this.getToursSubCategoryList();
        });

    }


    async getToursSubCategoryList() {
        this.routeType = 'entry';
        const response = await this.hostTourService.getTourSubCategoryList(this.svcId, this.categoryIds);
        this.hostServiceCategoryModel = response.data.Result;
    }

    saveTourSubCategories() {
        const response = this.hostTourService.updateWithHostLinkingSubCategory(this.hostServiceCategoryModel).then(res => {
            if (res.data.Status) {
                this.cancel();
            }
        }).catch((error) => {

        });
    }


    cancel(): void {
        this.getToursSubCategoryList();
    }

    selectUnselectCategories(hostServiceLinkingSubCategories: Array<HostServiceLinkingSubCategoryModel>, svcCatgId, isSelected): void {
        hostServiceLinkingSubCategories.forEach(element => {
            if (isSelected) {

                if (!element.isSelected) {
                    element.isSelected = true;
                }
            } else {

                element.isSelected = false;
            }

        });
    }

    selectUnselectSubCategory(hostServiceLinkingSubCategory: HostServiceLinkingSubCategoryModel): void {
    }





}
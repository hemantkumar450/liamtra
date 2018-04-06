import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueHomeModel, HostStayDetail } from '../../models/unique-home.model';
import { HostUniqueHomeService } from '../../services/unique-home.service';
import { ServiceCategoryService } from '../../services/service-category.service';
import { LocalStorageService } from '../../../../core';
import { ServiceSubCategory } from '../../models/unique-home.model';
import { ApiUrl } from '../../../../shared/api.service';


@Component({
    selector: 'app-hosted-unique-home-edit',
    templateUrl: './unique-home-edit.component.html',
    styleUrls: ['./unique-home-edit.component.css']
})

export class HostUniqueHomeEditComponent implements OnInit {

    menuItems: any;
    header: String = 'Hosted Unique Homes Details';
    IconClass: String = 'xxx';
    selectedTab: any;
    serviceCategoryList: Array<ServiceSubCategory> = [];
    uniqueHomeModel: UniqueHomeModel = new UniqueHomeModel();


    constructor(protected uniqueHomeService: HostUniqueHomeService,
        protected route: ActivatedRoute,
        private router: Router,
        public serviceCategoryService: ServiceCategoryService,
        private localStorageService: LocalStorageService) {

        this.uniqueHomeModel.svcId = this.route.snapshot.params['svcId'] || 0;
        if (this.localStorageService.getCurrentSelectedTab()) {
            this.selectedTab = this.localStorageService.getCurrentSelectedTab();
        } else {
            this.selectedTab = 'Detail';
        }
        this.getHostedUniqueHomeDetails();
        this.getAllServiceCategory();
    }

    async ngOnInit() {
        this.menuItems = [
            {
                label: 'Detail', icon: 'fa-bar-chart', command: (event) => {
                    this.onTabSelect('Detail');
                }
            },
            {
                label: 'Location', icon: 'fa-calendar', command: (event) => {
                    this.onTabSelect('Location');
                }
            },
            {
                label: 'Listing', icon: 'fa-book', command: (event) => {
                    this.onTabSelect('Listing');
                }
            },
            {
                label: 'Highlights', icon: 'fa-support', command: (event) => {
                    this.onTabSelect('Highlights');
                }
            },
            {
                label: 'Attachment', icon: 'fa-twitter', command: (event) => {
                    this.onTabSelect('Attachment');
                }
            }
        ];
    }

    async  getAllServiceCategory() {
        try {
            const response = await this.uniqueHomeService.getAllServiceCategory();
            if (response.data.Result) {
                this.serviceCategoryList = response.data.Result;
                this.serviceCategoryService.setAllServiceCategory(this.serviceCategoryList);
            }
        } catch (e) { }
    }

    onTabSelect(tab) {
        switch (tab) {
            case 'Detail':
                this.selectedTab = 'Detail';
                break;
            case 'Location':
                this.selectedTab = 'Location';

                break;
            case 'Listing':
                this.selectedTab = 'Listing';

                break;
            case 'Highlights':
                this.selectedTab = 'Highlights';

                break;
            case 'Attachment':
                this.selectedTab = 'Attachment';
                break;
        }
        this.localStorageService.setCurrentSelectedTab(tab)
    }

    async getHostedUniqueHomeDetails() {
        const data = await this.uniqueHomeService.getHostedHomeByBookingId(this.uniqueHomeModel.svcId);
        if (data.data.Result) {
            this.uniqueHomeModel = data.data.Result;
            this.uniqueHomeModel.allAttachments.forEach(attachment => {
                attachment.attachmentUrl = ApiUrl.SRC_URI + attachment.attachmentUrl;
              });

            if (!this.uniqueHomeModel.hostStayDetail) {
                this.uniqueHomeModel.hostStayDetail = new HostStayDetail();
            }
            this.uniqueHomeModel.hostStayDetail.checkInTime = new Date(this.uniqueHomeModel.hostStayDetail.checkInTime);
            this.uniqueHomeModel.hostStayDetail.checkOutTime = new Date(this.uniqueHomeModel.hostStayDetail.checkOutTime);
        }
    }

    saveDetail() {
        console.log(JSON.stringify(this.uniqueHomeModel));
        this.uniqueHomeService.saveHostDetail(this.uniqueHomeModel).then((res) => {
            this.router.navigate(['uniqueHome']);
        }).catch((error) => {
            console.log(error);
        })
        console.log(this.uniqueHomeModel.hostServiceLinkingSubCategories);
    }

    cancel() {
        this.router.navigate(['uniqueHome']);
    }

}

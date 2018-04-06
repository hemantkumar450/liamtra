import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { HostTourModel, HostTourService } from '../shared';
import { HostTourItenaryComponent } from '../../host-tour-itenary/host-tour-itenary.component';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { ServiceCategoryEnum } from '../../../shared/enum/base.enum';
import { MasterService } from '../../../shared';
declare const $;

@Component({
    selector: 'app-tour-edit.component',
    templateUrl: './tour-edit.component.html',
    styleUrls: ['./tour-edit.component.css']
})

export class HostTourEditComponent implements OnInit {
    public hostTour: HostTourModel = new HostTourModel();
    public moduleName = 'Host Tour';
    public faIcon = 'fa fa-user fa-fw';
    public tourId: number = 0;
    public svcId: number = 0;
    public selectedTab: String = '';
    public tours: Array<HostTourModel> = new Array<HostTourModel>();
    public routeType: string = 'addNew';
    public svclist: Array<CustomDDO> = new Array<CustomDDO>();
    public itenaryStatusList: Array<CustomDDO> = new Array<CustomDDO>();
    public selectedComponent: any;
    public countries: Array<any> = [];
    public states: Array<any> = [];
    public cities: Array<any> = [];

    constructor(
        protected masterService: MasterService,
        protected messageService: MessageService,
        protected hostTourService: HostTourService,
        protected router: Router,
        protected route: ActivatedRoute,
    ) {
        this.getCountryList();
    }

    ngOnInit() {

        if (this.route.children.length > 0) {
            const component = this.route.children[0].component['name'];
            this.selectedComponent = component;
        } else {
            this.selectedComponent = 'HostTourEditComponent'
        }

        this.route.params.subscribe((param) => {
            this.tourId = +param['tourId'];
            this.svcId = +param['svcId']
            this.getAllSvcidAndName();
        });

    }

    async getHostTourById() {
        if (this.tourId > 0) {
            this.routeType = 'entry';
            const response = await this.hostTourService.getHostTourById(this.tourId);
            this.hostTour = response.data.Result;
            await this.getStatesByCountryId(this.hostTour.hostService.countryId);
            await this.getCityListByCityId(this.hostTour.hostService.stateId);

            this.svcId = this.hostTour.svcId;
            this.hostTour.Header = 'Edit Host Tour',
                this.hostTour.IconClass = 'fa fa-fw fa-plus txt-color-blue';
        } else {
            this.routeType = 'addNew';
        }
        this.selecteTab(this.selectedComponent)
    }


    selecteTab(selectedComponent) {

        switch (selectedComponent) {
            case 'HostTourItenaryComponent':
                // this.getTourItenaries();
                this.selectedTab = 'Itenary';
                break;
            case 'HostTourDepartureComponent':
                // this.getTourDepartures();
                this.selectedTab = 'Departure';

                break;
            case 'HostTourAttachmentComponent':
                // this.getTourAttachments();
                this.selectedTab = 'Attachment';

                break;
            case 'HostTourSubCategoryComponent':
                // this.getTourSubCategories();
                this.selectedTab = 'SubCategory';

                break;
            case 'HostTourRouteComponent':
                // this.getHostTourRoute();
                this.selectedTab = 'HostTourRoute';
                break;
            case 'HostTourEditComponent':
                this.selectedTab = 'Info';
                break;

            // default:
            //     // this.getTourInfo();
            //     break;
        }

    }

    async getAllSvcidAndName() {
        this.svclist = [];
        this.getTourItenaryStatusList();
    }

    async getTourItenaryStatusList() {
        this.itenaryStatusList = await this.masterService.getSvcSubCategoryCodes(ServiceCategoryEnum.TourItenaryStatus);
        this.getHostTourById();
    }

    async getCountryList() {
        this.countries = await this.masterService.getCountryDDO();
    }
    async getStatesByCountryId(countryId) {
        this.states = await this.masterService.getStateDDO(countryId);

    }
    async getCityListByCityId(stateId) {
        this.cities = await this.masterService.getCityDDO(stateId);

    }
    cancel(): void {
        this.router.navigate(['host/tour']);
    }

    getTourInfo() {
        this.selectedTab = 'Info';
        this.router.navigate(['/host-tour/' + this.routeType + '/' + this.tourId + '/' + this.svcId]);
    }

    getTourItenaries() {
        this.selectedTab = 'Itenary';
        this.router.navigate(['/host-tour/' + this.routeType + '/' + this.tourId + '/' + this.svcId + '/HostTourItenary']);
    }

    getTourDepartures() {
        this.selectedTab = 'Departure';
        this.router.navigate(['/host-tour/' + this.routeType + '/' + this.tourId + '/' + this.svcId + '/HostTourDeparture']);
    }

    getTourAttachments() {
        this.selectedTab = 'Attachment';
        this.router.navigate(['/host-tour/' + this.routeType + '/' + this.tourId + '/' + this.svcId + '/HostTourAttachment']);
    }

    getTourSubCategories() {
        this.selectedTab = 'SubCategory';
        this.router.navigate(['/host-tour/' + this.routeType + '/' + this.tourId + '/' + this.svcId + '/HostTourSubCategory']);
    }
    getHostTourRoute() {
        this.selectedTab = 'HostTourRoute';
        this.router.navigate(['/host-tour/' + this.routeType + '/' + this.tourId + '/' + this.svcId + '/HostTourRoute']);
    }

    saveHostTour() {
        const message = { severity: 'error', summary: 'error', detail: '' };
        let error = 0;

        if (this.hostTour.svcName.trim() === '') {
            message.detail = '';
            message.detail = 'Please enter service name';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.svcDesc.trim() === '') {
            message.detail = '';
            message.detail = 'Please enter service description';
            this.messageService.showMessage(message);
            error++;
            return;
        }


        if (this.hostTour.tourOverview.trim() === '') {
            message.detail = '';
            message.detail = 'Please enter tour overview';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.totalAdultCapacity <= 0) {
            message.detail = '';
            message.detail = 'Total adult capacity must be greater than zero';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.totalChildCapacity <= 0) {
            message.detail = '';
            message.detail = 'Total child capacity must be greater than or equal to zero';
            this.messageService.showMessage(message);
            error++;
            return;
        }


        if (this.hostTour.pricePerPax <= 0) {
            message.detail = '';
            message.detail = 'Price per pax must be greater than zero';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.totalPrice <= 0) {
            message.detail = '';
            message.detail = 'Total total price must be greater than zero';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.tourItenaryStatus === 0 || this.hostTour.tourItenaryStatus === null) {
            message.detail = '';
            message.detail = 'Please select host tour itenary status';
            this.messageService.showMessage(message);
            error++;
            return;
        }



        if (this.hostTour.hostService.countryId === 0 || this.hostTour.hostService.countryId === null) {
            message.detail = '';
            message.detail = 'Tour country is mandatory';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.hostService.stateId === 0 || this.hostTour.hostService.stateId === null) {
            message.detail = '';
            message.detail = 'Selected tour country' + "'" + 's state is mandatory';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.hostService.cityId === 0 || this.hostTour.hostService.cityId === null) {

            message.detail = '';
            message.detail = 'selected tour state' + "'" + 's city is mandatory';
            this.messageService.showMessage(message);
            error++;
            return;
        }

        if (this.hostTour.hostService.eMailId != '') {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.hostTour.hostService.eMailId))) {
                message.detail = '';
                message.detail = 'Please enter valid email id';
                this.messageService.showMessage(message);
                error++;
                return;
            }
        }

        if (error > 0) {
            return;
        }

        const response = this.hostTourService.saveHostTourDetail(this.hostTour).then(res => {
            if (res.data.Status) {
                this.cancel();
            }
        })

    }



}


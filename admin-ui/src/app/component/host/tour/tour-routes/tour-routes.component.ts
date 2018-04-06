import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourRouteModel } from './tour-route.model'
import { MasterService } from '../../../shared';
import { HostTourModel, HostTourService } from '../shared';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { MessageService } from '../../../shared/message/messageService.service';

declare const $;

@Component({
    selector: 'app-host-tour-routes',
    templateUrl: './tour-routes.component.html',
    styleUrls: ['./tour-route.component.css']
})


export class HostTourRouteComponent implements OnInit {
    public tourRouteModel: TourRouteModel = new TourRouteModel();
    hostTourRoutes: Array<TourRouteModel> = [];
    countries: Array<any> = [];
    states: Array<any> = [];
    cities: Array<any> = [];
    moduleName: String = '';
    addFunctionName: any;
    faIcon: String = '';
    totalDB: Number = 0;
    header: String = '';
    public selectedTab: String = 'Info';

    IconClass: any
    hostTourId: Number = 0;
    constructor(private masterService: MasterService,
        protected route: ActivatedRoute,
        protected router: Router,
        private hostTourService: HostTourService,
        public notificationService: NotificationService,
        private messageService: MessageService

    ) {


    }

    async ngOnInit() {
        await this.getCountryList();
        await this.getAllStates();
        await this.getAllCity();
        this.route.parent.params.subscribe((param) => {
            this.hostTourId = +param['tourId'];
        });
        this.getAllRoutes();
    }

    async getAllRoutes() {
        const data = await this.hostTourService.getAllRoutes(this.hostTourId);
        if (data.data.Result) {
            this.hostTourRoutes = data.data.Result;
            this.hostTourRoutes.map(element => {
                const states = this.states.filter(state => {
                    return state.countryId === element.countryId;
                });
                const cities = this.cities.filter(city => {
                    return city.stateId === element.stateId;
                })
                element.selectedState = states;
                element.selectedCity = cities;
            });
        }
    }

    async getCountryList() {
        this.countries = await this.masterService.getCountryDDO();
    }
    // async getStatesByCountryId(countryId) {
    //     this.states = await this.masterService.getStateDDO(countryId);

    // }
    // async getCityListByCityId(stateId) {
    //     this.cities = await this.masterService.getCityDDO(stateId);

    // }

    async getAllStates() {
        this.states = await this.masterService.getAllStateDDO();

    }
    async getAllCity() {
        this.cities = await this.masterService.getAllCityDDO();

    }

    getStatesByCountryId(country) {
        country.selectedState = [];
        country.selectedState = this.states.filter(state => {
            return state.countryId === country.countryId;
        });

    }

    getCityListByStateId(state) {
        state.selectedCity = [];
        state.selectedCity = this.cities.filter(city => {
            return city.stateId === state.stateId;
        });
    }

    onTourRouteAdd() {
        let count = 0;
        this.hostTourRoutes.forEach((route) => {
            if (route.countryId === 0) {
                this.messageService.showMessage({
                    severity: 'error', summary: 'error',
                    detail: 'Please select country '
                });
                count++
            }
        })
        if (count > 0) {
            return;
        }
        const obj = new TourRouteModel();
        obj.hostTourId = this.hostTourId;
        this.hostTourRoutes = [...this.hostTourRoutes, obj];
    }

    saveHostTourRoute() {
        let count = 0;
        this.hostTourRoutes.forEach((route) => {
            if (route.countryId === 0) {
                this.messageService.showMessage({
                    severity: 'error', summary: 'error',
                    detail: 'Please select country '
                });
                count++
            }
            if ((route.countryId > 0 && route.stateId === 0) || (route.stateId > 0 && route.cityId === 0)) {
                this.messageService.showMessage({
                    severity: 'error', summary: 'error',
                    detail: 'Please select state or city for country ' + this.getCountryName(route.countryId)
                });
                count++
            }
        })
        if (count > 0) {
            return;
        }
        const response = this.hostTourService.saveHostTourRoute(this.hostTourRoutes).then(res => {
            if (res.data.Status) {
                this.cancel();
            }
        })
    }

    getCountryName(countryId) {
        const countryName = this.countries.filter((country) => {
            return country.value === countryId;
        })[0];
        return countryName.label
    }

    onRouteDelete(selectedRoute) {
        this.notificationService.smartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete State -  <span class='txt-color-orangeDark'><strong>"
                + selectedRoute.countryId + $('#show-shortcut').text() + "</strong></span> ?",
            content: "Are you sure you want to delete this State ?",
            buttons: '[No][Yes]'
        }, (ButtonPressed) => {
            if (ButtonPressed === 'No') {
                return;
            }
            selectedRoute.isActive = false;
            const response = this.hostTourService.saveHostTourRoute(this.hostTourRoutes).then(res => {
                if (res.data.Status) {
                    this.getAllRoutes()
                }
            })
        });
    }

    cancel() {
        this.router.navigate(['/host-tour']);
    }
}

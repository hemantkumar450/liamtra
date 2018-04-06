import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UniqueHomeModel } from '../../models/unique-home.model';
import { MasterService } from '../../../shared';

@Component({
    selector: 'app-unique-home-location',
    templateUrl: './location.component.html'
})

export class HostUniqueHomeLocationComponent implements OnInit {

    @Input() uniqueHome: UniqueHomeModel;
    @Output() changeInLocation = new EventEmitter();
    countries: Array<any> = [];
    states: Array<any> = [];
    cities: Array<any> = [];

    constructor(protected masterService: MasterService) {
        this.getCountryList();
    }

    ngOnInit() {
    }

    async getCountryList() {
        this.countries = await this.masterService.getCountryDDO();
        this.getStatesByCountryId();
    }

    async getStatesByCountryId() {
        this.states = await this.masterService.getStateDDO(this.uniqueHome.countryId);
        this.getCitiesByStateId();
    }

    async getCitiesByStateId() {
        this.cities = await this.masterService.getCityDDO(this.uniqueHome.stateId);
    }
}

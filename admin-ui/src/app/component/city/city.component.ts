import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel, CityService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
import { CustomDDO, MasterService } from '../shared';
declare const $;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: Array<CityModel> = [];
  countries: Array<CustomDDO> = new Array<CustomDDO>();
  countryId: number = 0;
  states: Array<CustomDDO> = new Array<CustomDDO>();
  stateId: number = 0;
  totalDB: number = 0;
  moduleName = 'Cities';
  addFunctionName = 'City';
  faIcon = 'fa fa-database fa-fw';
  messageModal: any;
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb:any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public cityService: CityService,
    public notificationService: NotificationService,
    public masterService: MasterService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.stateId = this.route.snapshot.queryParams['stateId'] || 35;
    this.countryId = this.route.snapshot.queryParams['countryId'] || 102;
    this.countryDDO();
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;

  }

  async countryDDO() {
    this.countries = await this.masterService.getCountryDDO();
    if (this.stateId > 0) {
      this.getStateDDO();
      this.getCityList();
    }
  }

  async getCityList() {
    if (this.stateId === 0) {
      const message = { severity: 'error', summary: 'error', detail: 'State should not be blank for search' };
      this.messageService.showMessage(message);
      return;
    }
    const response = await this.cityService.getCityList(this.stateId);
    console.log(response);
    this.cities = response.data.Result;
    this.totalDB = response.data.Result.length; // count of the array list
  }

  async getStateDDO() {
    this.states = await this.masterService.getStateDDO(this.countryId);
    if (this.states.length === 0) {
      this.stateId = 0;
    }
  }

  // refreshFilter() {
  //   this.cities = [];
  //   this.stateId = 0;
  //   this.countryId = 0;
  // }

  addCity(event): void {
    if (this.stateId === 0) {
      const message = { severity: 'error', summary: 'error', detail: 'Country & State should not be blank for add new city' };
      this.messageService.showMessage(message);
      return;
    }
    this.router.navigate(['/city/AddNew'], { queryParams: { countryId: this.countryId, stateId: this.stateId, cityId: 0 } });
  }

  // edit the selected row
  editCity(row: CityModel): void {
    this.router.navigate(['/city/Entry'], { queryParams: { countryId: this.countryId, stateId: this.stateId, cityId: row.cityId } });
  }
}

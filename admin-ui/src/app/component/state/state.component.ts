import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateModel, StateService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
declare const $;
import { CountryModel } from '../../component/country/shared/index';
import { MasterService, CustomDDO } from '../shared';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  state: StateModel = new StateModel();
  countries: Array<CustomDDO> = [];
  states: Array<StateModel> = [];
  totalDB: number = 0;
  moduleName = 'States';
  addFunctionName = 'State';
  faIcon = 'fa fa-flag-o fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public stateService: StateService,
    public masterService: MasterService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.state.countryId = this.route.snapshot.queryParams['countryId'] || 102;
    this.getStatesByCountryId();
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
    this.getCountryList();

  }

  delete(row: StateModel) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete State -  <span class='txt-color-orangeDark'><strong>"
        + row.stateCode + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Are you sure you want to delete this State ?",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.deleteState(row)
      }
    });
  }

  // changeSourceType () {

  // }

  async getCountryList() {
    this.countries = await this.masterService.getCountryDDO();

    // this.totalDB = response.data.Result.length; // count of the array list
  }

  async getStatesByCountryId() {
    console.log(this.state.countryId);
    const result = await this.stateService.getStateListByCountryId(this.state.countryId);
    this.states = result.data.Result;
    this.totalDB = result.data.Result.length;
  }


  addnewSource(event): void {
    this.router.navigate(['state/AddNew/' + this.state.countryId]);
  }

  editState(stateId): void {
    this.router.navigate(['state/Edit/' + this.state.countryId + '/' + stateId]);
  }

  deleteState(selectedState): void {
  selectedState.isActive = false
    this.stateService.deleteStateDetails(selectedState).then(result => {
      this.getStatesByCountryId()
    });
  }
}

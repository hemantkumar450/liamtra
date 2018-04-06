import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryModel, CountryService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
declare const $;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: Array<CountryModel> = [];
  totalDB: number = 0;
  moduleName = 'Countries';
  addFunctionName = 'Country';
  faIcon = 'fa fa-database fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent;
  gb;
  messageModal:any
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public countryService: CountryService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.getCountryList() // call function to get the Service Category List
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;

  }

  async getCountryList() {
    const response = await this.countryService.getCountryList();
    this.countries = response.data.Result;
    this.totalDB = response.data.Result.length; // count of the array list
  }

  addCountry(): void {
    this.router.navigate(['country/AddNew']);
  }

  // edit the selected row
  editCountry(row: CountryModel): void {
    this.router.navigate(['country/Entry/' + row.countryId]);
  }
}

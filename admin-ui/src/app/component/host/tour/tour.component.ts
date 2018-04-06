import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HostTourModel, HostTourService } from './shared/index';
import { TableHeaderComponent } from '../../shared/tableHeader/tableHeader.component';
declare const $;

@Component({
  selector: 'app-host-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})


export class HostTourComponent implements OnInit {
  hostTours: Array<HostTourModel> = [];
  tourId = 0;
  svcId: number = 0;
  totalDB: number = 0;
  moduleName = 'Tours';
  addFunctionName = 'Tour';
  faIcon = 'fa fa-database fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent;
  gb;

  constructor(
    private router: Router,
    public hostTourService: HostTourService) {
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
    this.getToursList();
  }

  addTour(): void {
    this.tourId = 0;
    this.router.navigate(['host/edit-tour/' + this.tourId + '/' + this.svcId]);
  }

  async getToursList() {
    console.log('');
    const response = await this.hostTourService.getToursList();
    this.hostTours = response.data.Result;
    this.totalDB = response.data.Result.length; // count of the array list
  }

  async editHostTour(row: HostTourModel) {
    this.router.navigate(['host/edit-tour/' + row.tourId + '/' + row.svcId]);
  }

}

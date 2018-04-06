import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceTypeModel, ServiceTypeService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
declare const $;

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit {
  serviceType: ServiceTypeModel = new ServiceTypeModel();
  ServiceTypes: Array<ServiceTypeModel> = [];
  totalDB: number = 0;
  moduleName = 'Service Types';
  addFunctionName = 'Service Type';
  faIcon = 'fa fa-database fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public serviceTypeService: ServiceTypeService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.getServiceTypes();
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
   }

  delete(row: ServiceTypeModel) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete Service Type -  <span class='txt-color-orangeDark'><strong>"
        + row.svcTypeCode + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Are you sure you want to delete this Service Type ?",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.deleteServiceType(row.svcTypeId)
      }
    });
  }

  getServiceTypes(): void {
    this.serviceTypeService.getServiceTypeList().then(result => {
      this.ServiceTypes = result.data.Result;
      this.totalDB = result.data.Result.length;
    })
  }

  addnewSource() {
    this.addNewSource();
  }

  addNewSource(): void {
    this.router.navigate(['serviceType/AddNew']);
  }

  editServiceType(serviceTypeId): void {
    this.router.navigate(['serviceType/Edit/' + serviceTypeId]);
  }

  deleteServiceType(ServiceTypeId): void {
    this.serviceTypeService.deleteServiceTypeDetails(ServiceTypeId).then(result => {
      this.getServiceTypes()
    });
  }
}

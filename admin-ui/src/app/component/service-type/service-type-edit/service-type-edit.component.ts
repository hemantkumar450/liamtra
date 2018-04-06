import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { CategoryListmodel } from '../../shared/model/category.model';
import { ServiceTypeModel, ServiceTypeService } from '../shared';
import { ServiceCategoryModel } from '../../serviceCategory/index';
@Component({
  selector: 'app-service-type-edit.component',
  templateUrl: './service-type-edit.component.html',
  styleUrls: ['./service-type-edit.component.css']
})
export class ServiceTypeEditComponent implements OnInit {
  serviceType: ServiceTypeModel = new ServiceTypeModel();
  moduleName = 'Service Type';
  faIcon = 'fa fa-desktop fa-fw';
  totalDB: number = 0;
  isLoading: boolean;
  serviceTypeId: number;
  public errorMsg: Message[] = [];
  isValidForm: true;
  // serviceCategories: Array<ServiceCategoryModel> = [];
  restServiceUrl: string;
  constructor(
    public messageService: MessageService,
    public serviceTypeService: ServiceTypeService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.serviceTypeId = this.route.snapshot.params['serviceTypeId'] || 0;
    this.totalDB = this.route.snapshot.params['totalDB']
    if (this.serviceTypeId > 0) {
      this.getServiceTypeById(this.serviceTypeId);
    }
    // this.getServiceCategories();
  }

  ngOnInit() {
  }

  cancel(): void {
    this.router.navigate(['/serviceType']);
  }

  async getServiceTypeById(ServiceTypeId) {
    const result = await this.serviceTypeService.getServiceTypeById(ServiceTypeId);
    this.serviceType = result.data.Result;
    this.serviceType.Header = 'Edit Service Type';
    this.serviceType.IconClass = 'fa fa-fw fa-plus txt-color-blue'
  }

  async saveServiceType() {
    if (this.serviceType.svcTypeCode.trim() === '') {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Service Type Code' }
      this.messageService.showMessage(message);
      return
    }
    if (this.serviceType.svcTypeName.trim() === '') {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter Service Type Name' }
      this.messageService.showMessage(message);
      return
    }


    const result = await this.serviceTypeService.saveServiceType(this.serviceType);
    if (result.data.Result) {
      this.router.navigate(['/serviceType']);
    }

  }




}



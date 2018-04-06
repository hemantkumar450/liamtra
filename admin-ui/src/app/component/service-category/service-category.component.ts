import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoryModel, ServiceCategoryService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
import { Message } from 'primeng/primeng';
declare const $;

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.css']
})
export class ServiceCategoryComponent implements OnInit {
  ServiceCategory: ServiceCategoryModel = new ServiceCategoryModel();
  ServiceCategories: Array<ServiceCategoryModel> = [];
  disabledAddNewButton: boolean = true;
  totalDB: number = 0;
  moduleName = 'Service Categories';
  addFunctionName = 'Category';
  faIcon = 'fa fa-database fa-fw';
  messageModal: Message[] = []
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent;
  gb: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public serviceCategoryService: ServiceCategoryService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.getServiceCategories() // call function to get the Service Category List
  }

  ngOnInit() { 
    this.gb = this.searchInput._gb.nativeElement;
  }

  async getServiceCategories() {
    console.log('')
    const response = await this.serviceCategoryService.getServiceCategoryList();
    this.ServiceCategories = response.data.Result;
    this.totalDB = response.data.Result.length; // count of the array list
  }

  addServiceCategory(): void {
    this.router.navigate(['serviceCategory/AddNew/' + this.totalDB]);
  }

  // edit the selected row 
  editServiceCategory(row: ServiceCategoryModel): void {
    this.router.navigate(['serviceCategory/Entry/' + row.svcCatgId + '/' + this.totalDB]);
  }

  // called once the user delete the particular item
  deleteServiceCategory(row: ServiceCategoryModel) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource -  <span class='txt-color-orangeDark'><strong>"
        + row.svcCatgDesc + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Are you sure you want to delete this DataSource ?",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        // calling the delete api with serviceCategoryId as a param
        this.serviceCategoryService.deleteServiceCategoryDetails(row.svcCatgId).then(result => {
          this.getServiceCategories();
        });
      }
    });
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConstantModel, SystemConstantService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
declare const $;

@Component({
  selector: 'app-service-category',
  templateUrl: './system-constant.component.html',
  styleUrls: ['./system-constant.component.css']
})
export class SystemConstantComponent implements OnInit {
  SystemConstant: SystemConstantModel = new SystemConstantModel();
  SystemConstants: Array<SystemConstantModel> = [];
  totalDB: number = 0;
  moduleName = 'System Constants';
  addFunctionName = 'System Constant';
  faIcon = 'fa fa-database fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public systemConstantService: SystemConstantService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.getSystemConstants();
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
  }

  delete(row: SystemConstantModel) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource -  <span class='txt-color-orangeDark'><strong>"
        + row.sysConstantDesc + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Are you sure you want to delete this DataSource ?",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {
        this.deleteSystemConstant(row.sysConstantId)
      }
    });
  }

  getSystemConstants(): void {
    this.systemConstantService.getSystemConstantList().then(result => {
      this.SystemConstants = result.data.Result;
      this.totalDB = result.data.Result.length;
    })
  }

  addnewSource(event) {
    this.addNewSource();
  }

  addNewSource(): void {
    this.router.navigate(['systemConstant/AddNew']);
  }

  editSystemConstant(SystemConstantId): void {
    this.router.navigate(['systemConstant/Edit/' + SystemConstantId]);
  }

  deleteSystemConstant(SystemConstantId): void {
    this.systemConstantService.deleteSystemConstantDetails(SystemConstantId).then(result => {
      this.getSystemConstants()
    });
  }
}

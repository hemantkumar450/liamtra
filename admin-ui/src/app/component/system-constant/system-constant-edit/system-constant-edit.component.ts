import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { CategoryListmodel } from '../../shared/model/category.model';
import { SystemConstantModel, SystemConstantService } from '../shared';
import { ServiceCategoryModel } from '../../../component/service-category/index';
@Component({
  selector: 'app-system-constant-edit.component',
  templateUrl: './system-constant-edit.component.html',
  styleUrls: ['./system-constant-edit.component.css']
})
export class SystemConstantEditComponent implements OnInit {
  systemConstant: SystemConstantModel = new SystemConstantModel();
  moduleName = 'System Constant';
  faIcon = 'fa fa-desktop fa-fw';
  totalDB: number =0;
  isLoading: boolean;
  type:any
  systemConstantId: number;
  public errorMsg: Message[] = [];
  isValidForm: true;
  serviceCategories: Array<ServiceCategoryModel> = [];
  restServiceUrl: string;
  message:Message[]=[];
  constructor(
    public messageService: MessageService,
    public systemConstantService: SystemConstantService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.systemConstantId = this.route.snapshot.params['systemConstantId'] || 0;
    this.totalDB = this.route.snapshot.params['totalDB']
    if (this.systemConstantId > 0) {
      this.getSystemConstantById(this.systemConstantId);
    }
    // this.getServiceCategories();
  }

  ngOnInit() {
  }

  cancel(): void {
    this.router.navigate(['/systemConstant']);
  }

  async getSystemConstantById(systemConstantId) {
    const result = await this.systemConstantService.getSystemConstantById(systemConstantId);
    this.systemConstant = result.data.Result;
    this.systemConstant.Header = 'Edit System Constant';
    this.systemConstant.IconClass = 'fa fa-fw fa-plus txt-color-blue'
  }

  async saveSystemConstant() {
    if (this.systemConstant.sysConstantCode === 0) {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter System Constant Code' }
      this.messageService.showMessage(message);
      return
    }
    if (this.systemConstant.sysConstantDesc.trim() === '') {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter System Constant Description' }
      this.messageService.showMessage(message);
      return
    }
    if (!this.systemConstant.sysConstValue || this.systemConstant.sysConstValue.trim() === '') {
      const message = { severity: 'error', summary: 'Error  Message', detail: 'Please Enter System value' }
      this.messageService.showMessage(message);
      return
    }

    const result = await this.systemConstantService.saveSystemConstant(this.systemConstant);
    if (result.data.Result) {
      this.router.navigate(['/systemConstant']);
    }

  }




}



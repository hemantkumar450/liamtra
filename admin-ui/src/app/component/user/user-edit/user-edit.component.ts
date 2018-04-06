import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/user.service';
import { UserModel, UserServiceModel } from '../shared/user.model';
import { MessageService } from 'app/component/shared/message/messageService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MasterService } from '../../shared';
import { ServiceCategoryEnum } from '../../shared/enum/base.enum';
import 'rxjs/Rx';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  header = '';
  addFunctionName = 'User';
  faIcon = 'fa fa-building fa-fw';
  message: Message[] = [];
  public gender = []
  public userTypes = [];
  public userStatus = [];
  public serviceTypeList = [];
  type: any;
  readonly: Boolean = false;

  public userModel: UserModel = new UserModel();
  userServiceModel: Array<UserServiceModel> = new Array<UserServiceModel>();

  constructor(private userService: UserService, public route: ActivatedRoute,
    public messageService: MessageService,
    private masterService: MasterService,
    private router: Router) {
    this.readonly = false;
    this.getUserServiceType();
    this.getUserStatus();
  }



  ngOnInit() {
    this.userModel.userId = this.route.snapshot.params['id'] || 0;
    if (this.userModel.userId > 0) {
      this.readonly = !this.readonly;
      this.getUserDetailsById(this.userModel.userId);
    }
    this.gender = [{ value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
    { value: 3, label: 'Just happy' }
    ]
  }

  async getUserServiceType() {
    this.userTypes = await this.masterService.getUserServiceType(ServiceCategoryEnum.UserType);
  }

  async getUserStatus() {
    this.userStatus = await this.masterService.getUserStatus(ServiceCategoryEnum.UserStatus);
  }

  addService(): void {
    let isEdit = false;
    const errorCount = 0;
    let message = {};
    this.userServiceModel.forEach(element => {
      if (element.isEdit) {
        isEdit = true;
      }
    });
    if (isEdit) {
      message = { severity: 'error', summary: 'error', detail: 'please save the prev item' };
      this.messageService.showMessage(message);
    }
    if (errorCount === 0 && !isEdit) {
      /* splice the object into the existing array */
      const item: UserServiceModel = new UserServiceModel();
      item.isEdit = true;
      item.userId = this.userModel.userId;
      this.userServiceModel = [...this.userServiceModel, item];
    }
  }

  async getUserDetailsById(userId) {
    const data = await this.userService.getUserDetailsById(userId);
    this.userModel = data.data.Result;
    this.userModel.Header = 'Edit User',
      this.userModel.IconClass = 'fa fa-fw fa-user txt-color-blue';
    const serviceTypeListTemp = data.data.Result.serviceTypes;
    serviceTypeListTemp.map(serviceType => {
      this.serviceTypeList.push({ label: serviceType.svcTypeCode, value: serviceType.svcTypeId });
    })

  }

  async saveUser(isValid) {

    const message = { severity: 'error', summary: 'Error', detail: 'First update previous edit' };
    const error = 0;
    if (this.userModel.userId === 0) {
      if (this.userModel.userFirstName.trim() === '') {
        message.detail = 'Please enter first name';
        this.messageService.showMessage(message);
        return
      }
      if (this.userModel.userLastName.trim() === '') {
        message.detail = 'Please enter last name';
        this.messageService.showMessage(message);
        return
      }
      if (this.userModel.userEmail.trim() === '') {
        message.detail = 'Please enter user email';
        this.messageService.showMessage(message);
        return
      }
      if (this.userModel.userPwd.trim() === '') {
        message.detail = 'Please enter password';
        this.messageService.showMessage(message);
        return
      }
      if (!this.userModel.userContactNo || this.userModel.userContactNo.trim() === '') {
        message.detail = 'Please enter user contact number';
        this.messageService.showMessage(message);
        return
      }

      if (!this.userModel.userTypeId) {
        message.detail = 'Please select user type';
        this.messageService.showMessage(message);
        return
      }

      if (this.userModel.userStatus === 0) {
        message.detail = 'Please Select user status';
        this.messageService.showMessage(message);
        return
        // error++;
      }

      if (this.userModel.gender === 0) {
        message.detail = 'Please select Gender';
        this.messageService.showMessage(message);
        return
      }
    }

    if (error > 0) {
      return;
    }

    this.userService.saveUserDetails(this.userModel).then((res) => {
      this.onCancel();
    })
  }

  onCancel(): void {
    this.router.navigate(['/user']);
  }

}

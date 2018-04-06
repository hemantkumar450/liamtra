import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel, UserService } from './shared/index';
import { NotificationService } from '../../shared/utils/notification.service';
import { Location } from '@angular/common';
import { MessageService } from '../shared/message/messageService.service'
import { TableHeaderComponent } from '../shared/tableHeader/tableHeader.component'
declare const $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  UserModel: UserModel = new UserModel();
  Users: Array<UserModel> = [];
  totalDB: number = 0;
  moduleName = 'Users';
  addFunctionName = 'User';
  faIcon = 'fa fa-database fa-fw';
  @ViewChild(TableHeaderComponent) searchInput: TableHeaderComponent
  gb;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public notificationService: NotificationService,
    private location: Location,
    public messageService: MessageService

  ) {
    this.getUserList()
  }

  ngOnInit() {
    this.gb = this.searchInput._gb.nativeElement;
    this.getUserList();
  }


  // called once the user delete the particular item
  deleteUser(row: UserModel) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Delete DataSource -  <span class='txt-color-orangeDark'><strong>"
        + row.userName + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Are you sure you want to delete this DataSource ?",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed === 'Yes') {

        this.userService.deleteUserDetails(row.userId).then(result => {
          this.getUserList()
        });
      }
    })
  }

  getUserList(): void {
    this.userService.getUserList().then(result => {
      this.Users = result.data.Result;
      this.totalDB = result.data.Result.length;
    })
  }

  // addnewUser() {
  //   this.addnewUser();
  // }

  // addnewUser(): void {
  //   this.router.navigate(['user/AddNew/edit']);
  // }
  addnewUser(event): void {
    this.router.navigate(['user/AddNew']);
  }
  editUser(id): void {
    this.router.navigate(['user/Edit/' + id]);
  }



  // deleteUser(id): void {
  //   alert('are your want to delte');
  //   this.userService.deleteUserDetails(id).then(result => {
  //     this.getUserList()
  //   });
  // }
}

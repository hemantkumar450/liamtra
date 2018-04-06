export class UserModel {
  userId: number;
  userName: String = '';
  userEmail: string = '';
  userPwd: String = '';
  gender: number = 0;
  userContactNo: string = '';
  userTypeId: number = 0;
  userStatus: number = 0;
  userFirstName: String = '';
  userMiddleName: String = '';
  userLastName: String = '';
  // serviceTypeIds = [];
  serviceTypes = [];
  isActive: Boolean = true;
  Header = 'Adding New User';
  IconClass = 'fa fa-fw fa-user txt-color-blue';
  userServiceModel: Array<UserServiceModel> = new Array<UserServiceModel>();
}

export class UserServiceModel {
  userId: number ;
  svcTypeId: number;
  serviceTypeStatus: number ;
  isEdit: Boolean = false;
}



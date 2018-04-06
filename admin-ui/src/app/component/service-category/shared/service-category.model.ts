export class ServiceCategoryModel {
  svcCatgId: number = 0;
  svcCatgCode: string = '';
  svcCatgDesc: string = '';
  Header = 'Edit Service Category';
  IconClass = 'fa fa-fw fa-plus txt-color-blue';
  isActive: boolean = false;
  serviceSubCategory: Array<ServiceSubCategoryModel> = new Array<ServiceSubCategoryModel>();
}

export class ServiceSubCategoryModel {
  svcSCatgId: number = 0;
  svcSCatgCode: string = '';
  svcSCatgDesc: string = '';
  svcCatgId: number = 0;
  isDeleted: boolean = false;
  isEdit: boolean = false;
  isActive: boolean = false;
}


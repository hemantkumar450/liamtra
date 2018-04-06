
export class HostTourModel {

  tourId: number = 0;
  svcId: number = 0;
  svcName: string = '';
  svcDesc: string = '';
  svcTypeId: number = 0;
  svcTypeName: string = '';
  countryId: number = 0;
  countryName: string = '';
  stateId: number = 0;
  stateName: string = '';
  cityName: string = '' ;
  totalAdultCapacity: number = 0;
  totalChildCapacity: number = 0;
  totalBookedAdultCapacity: number = 1;
  totalBookedChildCapacity: number = 1;
  pricePerPax: number = 0;
  totalPrice: number = 0;
  tourOverview: string = '';
  tourItenaryStatus: number = 0;
  cityId: number = 0;
  isActive: boolean = true;
  avgRating: number = 0;
  Header = 'Adding New Tour';
  IconClass = 'fa fa-fw fa-plus txt-color-blue';
  TotalDays: number = 0;
  totalNights: number = 0;
  hostService: HostService = new HostService();

}

export class HostService {
  svcId: number = 0;
  svcName: string = '';
  svcDesc: string = '';
  svcTypeId: number = 0;
  countryId: number = 0;
  stateId: number = 0;
  cityId: number = 0;
  address1: string = '';
  address2: string = '';
  landmark: string = '';
  zipCode: number = 0;
  ownerUserId: number = 0;
  contactNo: string = '';
  svcStatus: number = 0;
  eMailId: string = '';
  longitude: number = 0;
  latitude: number = 0;
  remarks1: string = '';
  remarks2: string = '';
  remarks3: string = '';
  remarks4: string = '';
  countryName: string = '';
  stateName: string = '';
  cityName: string = '';
  hostStatus: string = '';
  svcTypeName: string = '';
  ownerFirstName: string = '';
  ownerMiddleName: string = '';
  ownerLastName: string = '';
  ownerName: string = '';
}











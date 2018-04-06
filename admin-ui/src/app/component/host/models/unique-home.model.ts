export class UniqueHomeModel {
    svcId: Number = 0;
    hostName: String = '';
    hostDesc: String = '';
    svcTypeId: Number = 0;
    countryId: Number = 0;
    stateId: Number = 0;
    cityId: Number = 0;
    address1: String = '';
    address2: String = '';
    landmark: String = '';
    zipCode: Number;
    ownerUserId: Number = 0;
    contactNo: String = '';
    svcStatus: Number = 0;
    eMailId: String = '';
    longitude: Number;
    latitude: Number;
    remarks1: String = '';
    remarks2: String = '';
    remarks3: String = '';
    remarks4: String = '';
    modifiedBy: Number = 0;
    modificationDate: any = '2018-03-09T17:17:36.503Z';
    createdBy: Number = 0;
    creationDate: any = '2018-03-09T17:17:36.503Z';
    isActive: boolean = true;
    countryName: String = '';
    stateName: String = '';
    cityName: String = '';
    hostStatus: String = '';
    svcTypeName: String = '';
    ownerFirstName: String = '';
    ownerMiddleName: String = '';
    ownerLastName: String = '';
    ownerName: String = '';

    hostServiceLinkingSubCategories: Array<HostServiceLinkingSubCategories> = Array<HostServiceLinkingSubCategories>();
    allAttachments: Array<AttachmentModel> = Array<AttachmentModel>();
    reviews: Array<Reviews> = Array<Reviews>();
    isTermAccepted: Boolean = false;

    hostVehicleRoute: Array<HostVehicleRoute> = new Array<HostVehicleRoute>();
    hostStayDetail: HostStayDetail = new HostStayDetail();
    hostCharges: Array<HostCharges> = new Array<HostCharges>();

}

export class HostStayDetail {
    stayId: Number = 0;
    svcId: Number = 0;
    listType: Number = 0;
    propertyType: Number = 0;
    stayName: String = '';
    stayDesc: String = '';
    svcTypeId: Number = 0;
    numberOfRooms: Number = 0;
    numberOfBeds: Number = 0;
    numberOfBathRooms: Number = 0;
    roomPrice: Number;
    cleaningFee: Number;
    numberOfGuestsInRoom: Number = 0;
    bookingPreference: Number = 0;
    checkInTime: Date = new Date();
    checkOutTime: Date = new Date();
    flexible: Boolean;
    neighbourhood: String;
    experience: Number = 0
    ownerUserId: Number = 0;
    stayStatus: Number = 0;
    latitude: Number;
    longitude: Number;
    isActive: true;

    NumberOfBeds: Number = 0;
    NumberOfRooms: Number = 0;
}

export class HostServiceLinkingSubCategories {
    svcId: Number = 0;
    svcCatgId: Number = 0;
    svcSCatgId: Number = 0;
}

export class AttachmentModel {
    attachmentId: Number = 0;
    attachmentType: Number = 0;
    fileName: String;
    genId: Number = 0;
    svcTypeId: Number = 0;
    remarks: String = '';
    attachmmentStatus: Number = 33;
    attachmentDataBase64: String = '';
    attachmentData: String;
    attachmentUrl: String = '';

    isDefault: true;
    isDeleted: true;
    isTouched: true;
    cmsUrl: String = '';
    objectURL: {};
    modifiedBy: Number = 0;
    modificationDate: any = '2018-03-09T17:17:36.503Z';
    createdBy: Number = 0;
    creationDate: any = '2018-03-09T17:17:36.503Z';
    isActive: Boolean = true
}

export class Reviews {
    reviewId: Number = 0;
    reviewTypeId: Number = 0;
    reviewRatingValue: Number = 0;
    genId: Number = 0;
    svcTypeId: Number = 0;
    reviewRemarks: String = '';
    status: Number = 0;
    isActive: Boolean = true;
}

export class HostCharges {
    svcId: Number = 0;
    svcCatgId: Number = 0;
    svcSCatgId: Number = 0;
    amount: Number = 0;
    isActive: Boolean = true;
}


export class HostVehicleRate {
    rateId: Number = 0;
    svcId: Number = 0;
    vehicleType: Number = 0;
    rate: Number = 0;
    rateUOM: Number = 0;
}

export class HostVehicleRoute {
    routeId: Number = 0;
    svcId: Number = 0;
    fromRoute: String = '';
    toRoute: String = '';
}

export class ServiceCatogory {
    svcCatgId: Number = 0;
    svcCatgCode: String = '';
    svcCatgDesc: String = '';
    createdBy: Number = 0;
    creationDate: String = '';
    modifiedBy: Number = 0;
    modificationDate: String = '';
    isActive: Boolean = true;
    serviceSubCategory: Array<ServiceSubCategory> = [];
}

export class ServiceSubCategory {
    svcSCatgId: Number = 0;
    svcSCatgCode: Number = 0;
    svcSCatgDesc: String = '';
    svcCatgId: Number = 0;
    isActive: Boolean = true;
    isNew: Boolean = true;
    isSelected: Boolean = true;
    isDeleted: Boolean = true;
    label: any;
    value: any;
}

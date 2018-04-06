export class BookedUniqueHomeModel {

    bookingId: Number = 0;
    svcId: Number = 0;
    svcTypeId: Number = 0;
    bookerUserId: Number = 0;
    ownerUserId: Number = 0;
    status: Number = 0;
    statusType: string = ''
    isActive: Boolean = true;
    ownerName: string = '';
    ownerFirstName: string = '';
    ownerMiddleName: string = '';
    ownerLastName: string = '';
    bookerName: string = '';
    bookerFirstName: string = '';
    bookerMiddleName: string = '';
    bookerLastName: string = '';
    svcTypeName: string = '';
    svcTypeCode: string = '';
    hostName: string = '';
    hostDesc: string = '';
    totalAmount: Number = 0;
    numberOfRooms: Number = 0;
    fileName: string = '';
    guestName: string = '';
    checkIn: any;
    checkOut: any;
    contactNumber: string = '';
    emailId: string = '';
    attachmentUrl: string = '';
    bookStay: BookStay = new BookStay();
    bookTravellerDetail: TravellerDetail = new TravellerDetail();
    attachments: Attachment[] = [];
    bookCharges: Charges[] = []



}

export class Charges {
    bookingId: Number = 0;
    svcCatgId: Number = 0;
    svcSCatgId: Number = 0;
    amount: Number = 0;
    isActive: Boolean = true;
    svcSCatgDesc: string = '';
}

export class Attachment {
    attachmentId: Number = 0;
    attachmentType: Number = 0;
    fileName: string = '';
    genId: Number = 0;
    svcTypeId: Number = 0;
    remarks: string = '';
    attachmmentStatus: Number = 0;
    modifiedBy: Number = 0;
    modificationDate: string = '';
    createdBy: Number = 0;
    creationDate: string = '';
    isActive: false;
    ttachmentDataBase64: any;
    attachmentData: any;
    attachmentUrl: string = '';
    isDefault: false;
    isDeleted: false;
    cmsUrl: any;
    objectURL: any;
    isTouched: false
}

export class TravellerDetail {
    bookingId: Number = 0;
    genId: Number = 0;
    firstName: string = '';
    middleName: string = '';
    astName: string = '';
    mealPreference: Boolean = false;
    passportNumber: string = '';
    passportIssuingCountry: Number = 0;
    dateOfPassportIssue: any;
    dateOfPassportExpiry: any;
    remarks: string = '';
    isActive: Boolean = false;
}

export class BookStay {
    stayName: string = '';
    bookingId: Number = 0;
    genId: Number = 0;
    checkIn: string = '';
    checkOut: string = '';
    noOfDays: Number = 0;
    noOfAdultGuests: Number = 0;
    noOfChildGuests: Number = 0;
    uestName: string = '';
    emailId: string = '';
    contactNumber: Number = 0;
    remarks: string = '';
    guestName: string = '';
    guestIdType: Number = 0;
    listType: string = '';
    isActive: true
}
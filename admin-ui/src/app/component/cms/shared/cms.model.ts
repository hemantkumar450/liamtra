export class CmsListModel {
    cmsId = 0;
    sysConstantId: number;
    genId = 0;
    attachmentId = 0;
    cmsUrl = '';
    type: number;
    fileName: string;
    Header = 'Adding New CMS';
    IconClass = 'fa fa-fw fa-plus txt-color-blue';
    IsActive = true;
    IsDeleted=true;
    svcSCatgDesc='';
    sysConstantCode:number;
    sysConstantDesc='';
    sysConstantMainId: number;
    files: Array<any> = [];
    SystemConstant: any;
    attachment: Array<any> = [];
    review: Array<any> = [];
}

export class AttachmentModel {
    attachmentId: number;
    attachmentType: number;
    fileName: string;
    genId: number;
    svcTypeId: number;
    remarks: string;
    attachmmentStatus: any;
    attachmentDataBase64: any;
    attachmentData: any;
    attachmentUrl: string;
    type: number;
    cmsImage: string;
    isDeleted: boolean;
    isActive: boolean;
    cmsUrl: string;
    objectURL: any;
    isDefault: any;
    isTouched=true;
    
}

export class SystemConstantModel {
     SysConstantId:number;
     SysConstantCode:number;
     SysConstantDesc='';
     IsActive=true;
     SysConstValue='';
     Enabled= true;
     Visible=true;
    SvcCatgCode='';
}

export class ReviewModel {
    reviewId: number;
    reviewTypeId: number;
    reviewRatingValue: any;
    genId: number;
    svcTypeId: number;
    reviewRemarks: string;
    status: number;
    userName: string;
    svcTypeName: string;
    isDefault = false;
    isActive=true;
    isDeleted=false;
}



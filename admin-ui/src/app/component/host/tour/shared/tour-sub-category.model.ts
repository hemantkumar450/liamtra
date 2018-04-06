export class HostTourInclusionModel {
    svcId:number = 0;
    tourId:number = 0;
    hostTourCategoryModel : Array<HostTourCategoryModel> =[];


}

export class HostTourCategoryModel{
    svcCatgId:number = 0;
    svcCatgCode:string ='';
    svcCatgDesc:string ='';
    isActive:boolean = true;
    hostTourSubCatagoryModel : Array<HostTourSubCatagoryModel> =[];
    isSelected:boolean = false;
}

export class HostTourSubCatagoryModel{
    svcSCatgId:number = 0;
    svcSCatgCode:string ='';
    svcSCatgDesc:string ='';
    svcCatgId:number = 0;
    isActive:boolean = false;
    isNew:boolean = false;
    isSelected:boolean = false;
    svcId:number = 0;
}


export class HostServiceCategoryModel
{
    svcCatgId:number = 0;
    svcCatgCode:string = "";
    svcCatgDesc:string = "";
    isSelected:boolean = false;
    svcId:number = 0;
    hostServiceLinkingSubCategories :Array<HostServiceLinkingSubCategoryModel> = [];
}

export class HostServiceLinkingSubCategoryModel{
    svcId:number = 0;
    svcCatgId:number = 0;
    isActive:boolean = false;
    svcSCatgDesc:string = '';
    svcSCatgCode:string = '';
    isNew:boolean = false;
    isSelected:boolean = false;

}
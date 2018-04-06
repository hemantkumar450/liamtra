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
    url: string;
}

export class ReviewModel {
    reviewId: Number;
    reviewTypeId: Number;
    reviewRatingValue: Number;
    genId: Number;
    svcTypeId: Number;
		reviewRemarks: String = '';
		userName: String = '';
		status: String = '';
		svcTypeName: String = '';
    isActive: Boolean = false;
    Header = 'Edit Review';
    IconClass = 'fa fa-fw fa-plus txt-color-blue';
}

import { ServiceSubCategoryModel } from '../../../components/book/shared';


export interface AppState {
	bookUniqueHome: BookUniqueHomeState;
}

export interface BookUniqueHomeState {
	serviceSubCategoryModel: ServiceSubCategoryModel[];
}
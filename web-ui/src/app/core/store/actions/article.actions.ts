import { Action } from '@ngrx/store';
import { ServiceSubCategoryModel } from '../../../components/book/shared';

export const BookUniqueHome = 'BookUniqueHome';


export class BookUniqueHomeSearchFilter implements Action {
  readonly type = BookUniqueHome;
  constructor(public payload: ServiceSubCategoryModel[]) { }
}

export type All = BookUniqueHomeSearchFilter; 
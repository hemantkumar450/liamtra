import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/article.actions';
import { BookUniqueHomeState } from './app.states';
import { ServiceSubCategoryModel } from '../../../components/book/shared';

export const initialState: BookUniqueHomeState = { serviceSubCategoryModel: [] };

export function reducer(state = initialState, action: fromActions.All): BookUniqueHomeState {
  switch (action.type) {
    case fromActions.BookUniqueHome: {
      return { serviceSubCategoryModel: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getBookUniqueHomeState = createFeatureSelector<BookUniqueHomeState>('bookUniqueHome');

// export const getBookUniqueHomeFilter = createSelector(getBookUniqueHomeState, (state: BookUniqueHomeState) => {
//   return state.serviceSubCategoryModel
// });

export const getBookUniqueHomeFilter = createSelector(
  getBookUniqueHomeState, 
  (state: BookUniqueHomeState) => state.serviceSubCategoryModel 
);

// export const getBookUniqueHomeFilter = createSelector(getBookUniqueHomeState, entities => {
//   return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
// });
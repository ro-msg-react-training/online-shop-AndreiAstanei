import { createStore, combineReducers } from 'redux';
import { productListReducer } from './ProductListSection/reducers';
import { ProductListState } from './ProductListSection/types';
import { productDetailsReducer } from './ProductDetailsSection/reducers';
import { ProductDetailsState } from './ProductDetailsSection/types';

export interface AppState {
    prodListReducer : ProductListState;
    prodDetailsReducer : ProductDetailsState;
}

const rootReducer = combineReducers({
    prodListReducer : productListReducer,
    prodDetailsReducer : productDetailsReducer
});

export function configureStore() {
    const store = createStore(rootReducer);

    return store;
}
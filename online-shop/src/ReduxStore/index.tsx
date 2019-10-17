import { createStore, combineReducers } from 'redux';
import { productListReducer } from './ProductListSection/reducers';
import { ProductListState } from './ProductListSection/types';

export interface AppState {
    prodListReducer : ProductListState;
}

const rootReducer = combineReducers({
    prodListReducer : productListReducer
});

export function configureStore() {
    const store = createStore(rootReducer);

    return store;
}
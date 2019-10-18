import { createStore, combineReducers } from 'redux';
import { productListReducer } from './ProductListSection/reducers';
import { ProductListState } from './ProductListSection/types';
import { productDetailsReducer } from './ProductDetailsSection/reducers';
import { ProductDetailsState } from './ProductDetailsSection/types';
import * as serviceWorker from '../serviceWorker';
import { ShoppingCartState } from './ShoppingCartSection/types';
import { shoppingCartReducer } from './ShoppingCartSection/reducers';

export interface AppState {
    prodListReducer : ProductListState;
    prodDetailsReducer : ProductDetailsState;
    cartReducer : ShoppingCartState;
}

const rootReducer = combineReducers({
    prodListReducer : productListReducer,
    prodDetailsReducer : productDetailsReducer,
    cartReducer : shoppingCartReducer
});

export function configureStore() {
    const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

    return store;
}
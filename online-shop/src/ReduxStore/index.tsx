import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer } from './ProductListSection/reducers';
import { ProductListState } from './ProductListSection/types';
import { productDetailsReducer } from './ProductDetailsSection/reducers';
import { ProductDetailsState } from './ProductDetailsSection/types';
import { ShoppingCartState } from './ShoppingCartSection/types';
import { shoppingCartReducer } from './ShoppingCartSection/reducers';
import { EditProductPageState } from './EditProductPageSection/types';
import { editProductPageReducer } from './EditProductPageSection/reducers';
import { NewProductState } from './NewProductSection/types';
import { newProductReducer } from "./NewProductSection/reducers";
import { AppComponentState } from './AppComponentSection/types';
import { appComponentReducer } from './AppComponentSection/reducers';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Sagas/saga';

export interface AppState {
    prodListReducer : ProductListState;
    prodDetailsReducer : ProductDetailsState;
    cartReducer : ShoppingCartState;
    editProductReducer : EditProductPageState;
    newProdReducer : NewProductState;
    appReducer : AppComponentState;
}

const rootReducer = combineReducers({
    prodListReducer : productListReducer,
    prodDetailsReducer : productDetailsReducer,
    cartReducer : shoppingCartReducer,
    editProductReducer : editProductPageReducer,
    newProdReducer : newProductReducer,
    appReducer : appComponentReducer
});

const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
    const store = createStore(rootReducer,
        compose(
            applyMiddleware(sagaMiddleware),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
            ));

    sagaMiddleware.run(rootSaga);

    return store;
}
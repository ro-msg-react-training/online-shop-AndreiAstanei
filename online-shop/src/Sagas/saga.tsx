import { takeLatest, all } from 'redux-saga/effects';
import * as PLTypes from '../ReduxStore/ProductListSection/types';
import * as PDTypes from '../ReduxStore/ProductDetailsSection/types';
import * as NPTypes from '../ReduxStore/NewProductSection/types';
import * as EPTypes from '../ReduxStore/EditProductPageSection/types';
import * as SCTypes from '../ReduxStore/ShoppingCartSection/types';
import * as SVTypes from '../ReduxStore/SalesViewSection/types';
import * as LCTypes from '../ReduxStore/LoginComponentSection/types';
import { performLoadSalesCallToServer } from './SalesViewSaga/ManageSalesViewSagaCalls';
import { performLoadProductDetailsForEdit, performSaveChangesForProductEdit } from './EditProductSaga/ManageEditProductSagaCalls';
import { performProductListLoad } from './ProductListSaga/ManageProductListSagaCalls';
import { performProductDetailsLoadData, performProductDeleteApiCall } from './ProductDetailsSaga/ManageProductDetailsSagaCalls';
import { performNewProductRequest } from './NewProductSaga/ManageNewProductSagaCalls';
import { performCheckoutCallToServer } from './ShoppingCartSaga/ManageShoppingCartSagaCalls';
import { performLoginRequest } from './LoginSaga/ManageLoginSagaCalls';

function* watchProductListEvents() {
  yield takeLatest(PLTypes.LOAD_PRODUCTS, performProductListLoad)
}

function* watchProductDetailsEvents() {
  yield takeLatest(PDTypes.LOAD_PRODUCT_DETAILS, performProductDetailsLoadData);
  yield takeLatest("DELETE_PROD_MODAL", performProductDeleteApiCall);
}

function* watchNewProductsEvents() {
  yield takeLatest(NPTypes.CREATE_PRODUCT, performNewProductRequest)
}

function* watchProductEditEvents() {
  yield takeLatest(EPTypes.LOAD_PRODUCT_DETAILS_FOR_EDIT, performLoadProductDetailsForEdit);
  yield takeLatest(EPTypes.EDIT_PRODUCT, performSaveChangesForProductEdit);
}

function* watchShoppingCartEvents() {
  yield takeLatest(SCTypes.CHECKOUT_SHOPPING_CART, performCheckoutCallToServer);
}

function* watchSalesViewEvents() {
  yield takeLatest(SVTypes.LOAD_SALES, performLoadSalesCallToServer);
}

function* watchLoginViewEvents() {
  yield takeLatest(LCTypes.LOGIN_USER, performLoginRequest);
}

export default function* rootSaga() {
  yield all([
    watchProductListEvents(),
    watchProductDetailsEvents(),
    watchNewProductsEvents(),
    watchProductEditEvents(),
    watchShoppingCartEvents(),
    watchSalesViewEvents(),
    watchLoginViewEvents()
  ])
}
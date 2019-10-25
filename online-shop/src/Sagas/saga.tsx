import { takeLatest, put, all } from 'redux-saga/effects';
import * as PLTypes from '../ReduxStore/ProductListSection/types';
import { IProduct } from '../Models/Models';
import { loadProducts } from '../ReduxStore/ProductListSection/actions';
import * as PDTypes from '../ReduxStore/ProductDetailsSection/types';
import { loadProductDetails, activateModalRedirectToProducts, deleteProductFromStore } from '../ReduxStore/ProductDetailsSection/actions';
import * as NPTypes from '../ReduxStore/NewProductSection/types';
import { createNewProduct } from '../ReduxStore/NewProductSection/actions';
import * as EPTypes from '../ReduxStore/EditProductPageSection/types';
import { loadProductData, editProduct } from '../ReduxStore/EditProductPageSection/actions';
import * as SCTypes from '../ReduxStore/ShoppingCartSection/types';
import { checkoutShoppingCart, decreaseProductQuantity } from '../ReduxStore/ShoppingCartSection/actions';

function* performProductListLoad() {
  const ProductsApiEndpointUrl = "http://localhost:4000/products";

  let fetchedList: IProduct[] = [];
  let loadingStatus: boolean = true;
  let errorMessage: string = "No errors found";

  yield fetch(ProductsApiEndpointUrl, { method: 'GET' })
    .then(response => response.json())
    .then(result => {
      fetchedList = result;
      loadingStatus = false
    })
    .catch(error => {
      errorMessage = error;
      loadingStatus = false
    });

  yield put(loadProducts(fetchedList, loadingStatus, errorMessage));
}

function* watchProductListEvents() {
  yield takeLatest(PLTypes.LOAD_PRODUCTS, performProductListLoad)
}

function* performProductDetailsLoadData(action: any) {
  const ProductDetailsApiEndpoint = `http://localhost:4000/products/${action.payload}`;

  let receivedProductData: IProduct = {} as any;
  let loadingStatus: boolean = true;
  let deleteModalStatus: boolean = false;
  let redirectToShoppingCartAction: boolean = false;
  let errorMessage: string = "No errors found";

  yield fetch(ProductDetailsApiEndpoint, { method: 'GET' })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Could not load product details.');
      }
    })
    .then(productData => {
      receivedProductData = productData;
      loadingStatus = false;
    })
    .catch(error => {
      console.log("This is the error: " + error);
      errorMessage = error;
      loadingStatus = false;
    });

  yield put(loadProductDetails(receivedProductData, loadingStatus, deleteModalStatus, redirectToShoppingCartAction, errorMessage));
}

function* performProductDeleteApiCall(action: any) {
  const deleteProductApiEndpoint = `http://localhost:4000/products/${action.payload}`;

  yield fetch(deleteProductApiEndpoint, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Encountered a problem when deleting the product.');
      }
    })
    .catch(error => {
      console.log(error);
    });

    yield put(activateModalRedirectToProducts());
    yield put(deleteProductFromStore(action.payload));
    yield put(decreaseProductQuantity(action.payload, 2));
}

function* watchProductDetailsEvents() {
  yield takeLatest(PDTypes.LOAD_PRODUCT_DETAILS, performProductDetailsLoadData);
  yield takeLatest("DELETE_PROD_MODAL", performProductDeleteApiCall);
}

function* performNewProductRequest(action: any) {
  let productId: number = 123;
  let serverResponse: number = 0;
  let newProduct: IProduct = action.payload;
  const apiEndpoint = "http://localhost:4000/products";

  //Get the number of products in store, so we can generate an id for the new product
  yield fetch(apiEndpoint, { method: 'GET' })
    .then(response => response.json())
    .then(result => {
      productId = [...result].length + 1;
    });

  newProduct.id = productId;

  //Call the server with the new product data, to create the product
  yield fetch(apiEndpoint, {
    headers: {
      'Content-Type': 'application/json; chartset=UTF-8',
      'Accept': 'application/json'
    }, method: 'POST', body: JSON.stringify(newProduct)
  })
    .then(response => {
      if (response.status === 200) {
        serverResponse = response.status;
      } else {
        serverResponse = 204;
      }
    })
    .catch(error => {
      console.log(error);
      serverResponse = 999;
    });

  //update the state of the action
  yield put(createNewProduct(serverResponse));
}

function* watchNewProductsEvents() {
  yield takeLatest(NPTypes.CREATE_PRODUCT, performNewProductRequest)
}

function* performLoadProductDetailsForEdit(action: any) {
  const ProductDetailsApiEndpoint = "http://localhost:4000/products/" + action.payload;

  let receivedProductData: IProduct = {} as any;

  yield fetch(ProductDetailsApiEndpoint)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Could not load product details.');
      }
    })
    .then(productData => {
      receivedProductData = productData;
    })
    .catch(error => {
      console.log("This is the error: " + error);
    });

  yield put(loadProductData(receivedProductData));
}

function* performSaveChangesForProductEdit(action: any) {
  const apiEndpoint = "http://localhost:4000/products/" + action.payload.id;
  let serverResponse: number = 0;
  const updatedProduct: IProduct = action.payload;

  yield fetch(apiEndpoint, {
    headers: {
      'Content-Type': 'application/json; chartset=UTF-8',
      'Accept': 'application/json'
    }, method: 'PUT', body: JSON.stringify(updatedProduct)
  })
    .then(response => {
      serverResponse = response.status;
    })
    .catch(error => {
      console.log(error);
      serverResponse = 999;
    });

  yield put(editProduct(updatedProduct, serverResponse));
}

function* watchProductEditEvents() {
  yield takeLatest(EPTypes.LOAD_PRODUCT_DETAILS_FOR_EDIT, performLoadProductDetailsForEdit);
  yield takeLatest(EPTypes.EDIT_PRODUCT, performSaveChangesForProductEdit);
}

function* performCheckoutCallToServer(action: any) {
  const ordersApiEndpointUrl = "http://localhost:4000/orders/";
  let apiCallResponse: number = 0;

  yield fetch(ordersApiEndpointUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }, method: 'POST', body: action.checkoutValue
  })
    .then(response => {
      apiCallResponse = response.status
    })
    .catch(error => {
      console.log(error);
      apiCallResponse = 999;
    });

  yield put(checkoutShoppingCart([], [], apiCallResponse));
}

function* watchShoppingCartEvents() {
  yield takeLatest(SCTypes.CHECKOUT_SHOPPING_CART, performCheckoutCallToServer);
}

export default function* rootSaga() {
  yield all([
    watchProductListEvents(),
    watchProductDetailsEvents(),
    watchNewProductsEvents(),
    watchProductEditEvents(),
    watchShoppingCartEvents()
  ])
}
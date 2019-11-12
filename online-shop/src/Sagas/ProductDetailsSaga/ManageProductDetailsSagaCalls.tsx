import { put } from "redux-saga/effects";
import { IProduct } from "../../Models/Models";
import { loadProductDetails, activateModalRedirectToProducts, deleteProductFromStore, PDResetLoadingStatus } from "../../ReduxStore/ProductDetailsSection/actions";
import { decreaseProductQuantity } from "../../ReduxStore/ShoppingCartSection/actions";

export function* performProductDetailsLoadData(action: any) {
    const ProductDetailsApiEndpoint = `http://localhost:4000/products/${action.payload}`;

    //Activate loading window
    yield put(PDResetLoadingStatus());
  
    let receivedProductData: IProduct = {} as any;
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
      })
      .catch(error => {
        console.log("This is the error: " + error);
        errorMessage = error;
      });
  
    yield put(loadProductDetails(receivedProductData, deleteModalStatus, redirectToShoppingCartAction, errorMessage));
  }
  
  export function* performProductDeleteApiCall(action: any) {
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
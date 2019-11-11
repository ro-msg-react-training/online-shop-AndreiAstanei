import { put } from 'redux-saga/effects';
import { IProduct } from '../../Models/Models';
import { loadProductData, updateTemporaryProduct, editProduct, EPResetLoadingStatus } from '../../ReduxStore/EditProductPageSection/actions';

export function* performLoadProductDetailsForEdit(action: any) {
    const ProductDetailsApiEndpoint = "http://localhost:4000/products/" + action.payload;

    //Activating loading window
    yield put(EPResetLoadingStatus());
  
    let receivedProductData: IProduct = {} as any;
    let serverResponse: number = 0;
  
    yield fetch(ProductDetailsApiEndpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not load product details for Edit Action');
        }
      })
      .then(productData => {
        receivedProductData = productData;
      })
      .catch(error => {
        serverResponse = 999;
        console.log(error);
      });
  
    yield put(loadProductData(receivedProductData, serverResponse));
  
    //Setting the editable object initial values
    yield put(updateTemporaryProduct(receivedProductData));
  }
  
  export function* performSaveChangesForProductEdit(action: any) {
    const apiEndpoint = "http://localhost:4000/products/" + action.payload.id;
    let serverResponse: number = 0;
    const updatedProduct: IProduct = action.payload;

    console.log("Activating loading...");
    //Activating loading window
    yield put(EPResetLoadingStatus());
  
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
  
    console.log("Deactivating loading...");
    yield put(editProduct(updatedProduct, serverResponse));
  }
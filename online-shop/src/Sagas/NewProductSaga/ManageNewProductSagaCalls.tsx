import { put } from "redux-saga/effects";
import { IProduct } from "../../Models/Models";
import { createNewProduct, NPResetLoadingStatus } from "../../ReduxStore/NewProductSection/actions";

export function* performNewProductRequest(action: any) {
  let productId: number = 123;
  let serverResponse: number = 0;
  let newProduct: IProduct = action.payload;
  const apiEndpoint = "http://localhost:4000/products";

  //Activate loading window
  yield put(NPResetLoadingStatus());

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
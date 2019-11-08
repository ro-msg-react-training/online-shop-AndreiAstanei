import { put } from "redux-saga/effects";
import { checkoutShoppingCart, SCResetLoadingStatus } from "../../ReduxStore/ShoppingCartSection/actions";

export function* performCheckoutCallToServer(action: any) {
    const ordersApiEndpointUrl = "http://localhost:4000/orders/";
    let apiCallResponse: number = 0;

    //Activate loading window
    yield put(SCResetLoadingStatus());
  
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
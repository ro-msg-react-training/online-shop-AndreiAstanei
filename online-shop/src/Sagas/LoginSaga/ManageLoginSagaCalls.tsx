import { put } from 'redux-saga/effects';
import { loginUser, lcTriggerLoadingWindow } from '../../ReduxStore/LoginComponentSection/actions';
import { LoginEntity, ShopUserInfo } from '../../Models/Models';

export function* performLoginRequest(action: any) {
    const apiEndpoint = "http://localhost:4000/login";
    let serverResponse : number = 0;
    let afterLoginUserInformation : ShopUserInfo = {} as any;
    let hasError : boolean = false;

    let newLoginInstance : LoginEntity = {
        username : action.username,
        password : action.password
    }
  
    //Activate loading window
    yield put(lcTriggerLoadingWindow());

    //Perform login call
    yield fetch(apiEndpoint, {
      headers: {
        'Content-Type': 'application/json; chartset=UTF-8',
        'Accept': 'application/json'
      }, method: 'POST', body: JSON.stringify(newLoginInstance)
    })
      .then(response => {
        if (response.status === 200) {
          serverResponse = response.status;
          return response.json();
        } else {
          serverResponse = 401;
        }
      })
      .then(result => {
        afterLoginUserInformation = result
      })
      .catch(error => {
        console.log("LoginSagaError: " + error);
        serverResponse = 999;
        hasError = true;
      });
  
    //update the state of the action
    yield put(loginUser(afterLoginUserInformation, hasError, serverResponse));
  }
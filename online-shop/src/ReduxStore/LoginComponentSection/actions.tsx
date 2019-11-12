import * as LCTypes from './types';
import { ShopUserInfo } from '../../Models/Models';

export function loginUser(loginInfo : ShopUserInfo, errorStatus : boolean, serverResponse : number): LCTypes.LoginComponentActionTypes {
    return {
        type : LCTypes.LOGIN_USER_ASYNC,
        loginInformation : loginInfo,
        error : errorStatus,
        serverResponse : serverResponse
    };
}

export function logoutUser(errorStatus : boolean) : LCTypes.LoginComponentActionTypes {
    return {
        type : LCTypes.LOGOUT_USER,
        error : errorStatus
    };
}

export function lcTriggerLoadingWindow() : LCTypes.LoginComponentActionTypes {
    return {
        type : LCTypes.LC_TRIGGER_LOADING_WINDOW
    };
}

export function lcUpdateLoginInformation(username : string, password : string) : LCTypes.LoginComponentActionTypes {
    return {
        type : LCTypes.LC_UPDATE_LOGIN_INFORMATION,
        username : username,
        password : password
    };
}

export function lcResetLoginComponentState() : LCTypes.LCResetLoginComponentStateAction {
    return {
        type : LCTypes.LC_RESET_STATE
    };
}
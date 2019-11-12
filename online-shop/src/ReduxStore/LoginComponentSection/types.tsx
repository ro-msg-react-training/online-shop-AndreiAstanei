import { ShopUserInfo, LoginEntity } from "../../Models/Models";

export interface LoginComponentState {
    userInfo : ShopUserInfo;
    isLoggedIn : boolean;
    isLoading : boolean;
    error : boolean;
    loginData : LoginEntity;
    serverResponse : number;
}

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_ASYNC = "LOGIN_USER_ASYNC";
export const LOGOUT_USER = "LOGOUT_USER";
export const LC_TRIGGER_LOADING_WINDOW = "LC_TRIGGER_LOADING_WINDOW";
export const GET_LOGGED_IN_STATUS = "GET_LOGGED_IN_STATUS";
export const LC_UPDATE_LOGIN_INFORMATION = "LC_UPDATE_LOGIN_INFORMATION";
export const LC_RESET_STATE = "LC_RESET_STATE";

export interface LCLoginUserAryncAction {
    type : typeof LOGIN_USER_ASYNC;
    loginInformation : ShopUserInfo;
    error : boolean;
    serverResponse : number;
}

export interface LCLogoutUserAction {
    type : typeof LOGOUT_USER;
    error : boolean;
}

export interface LCTriggerLoadingAction {
    type : typeof LC_TRIGGER_LOADING_WINDOW;
}

export interface LCUpdateLoginInformationAction {
    type : typeof LC_UPDATE_LOGIN_INFORMATION,
    username : string,
    password : string
}

export interface LCResetLoginComponentStateAction {
    type : typeof LC_RESET_STATE
}

export type LoginComponentActionTypes = LCLoginUserAryncAction | LCLogoutUserAction | LCTriggerLoadingAction | LCUpdateLoginInformationAction | LCResetLoginComponentStateAction;
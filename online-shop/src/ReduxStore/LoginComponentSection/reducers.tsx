import * as LCTypes from './types';
import { emptyLoginUser, LoginEntity } from '../../Models/Models';

export const initialState: LCTypes.LoginComponentState = {
    userInfo: emptyLoginUser,
    isLoggedIn: false,
    isLoading: false,
    error: false,
    loginData: {
        username: "",
        password: ""
    },
    serverResponse: 0
};

export function loginReducer(state: LCTypes.LoginComponentState = initialState, action: LCTypes.LoginComponentActionTypes): LCTypes.LoginComponentState {
    switch (action.type) {
        case LCTypes.LOGIN_USER_ASYNC: {
            let serverStatus: number = action.serverResponse;

            return {
                userInfo: action.loginInformation,
                isLoggedIn: serverStatus === 200 ? true : false,
                isLoading: false,
                error: action.error,
                loginData: state.loginData,
                serverResponse: action.serverResponse
            };
        }

        case LCTypes.LOGOUT_USER: {
            return {
                userInfo: emptyLoginUser,
                isLoggedIn: false,
                isLoading: false,
                error: action.error,
                loginData: state.loginData,
                serverResponse: state.serverResponse
            };
        }

        case LCTypes.LC_TRIGGER_LOADING_WINDOW: {
            return {
                ...state,
                isLoading: true
            };
        }

        case LCTypes.LC_UPDATE_LOGIN_INFORMATION: {
            let newLoginData: LoginEntity = {
                username: action.username,
                password: action.password
            }

            return {
                ...state,
                loginData: newLoginData
            };
        }

        case LCTypes.LC_RESET_STATE: {
            return {
                ...state,
                error : false,
                serverResponse : 0
            };
        }

        default:
            return state;
    }
}
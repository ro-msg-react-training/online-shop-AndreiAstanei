import { Dispatch } from "redux";
import { LoginEntity } from "../../Models/Models";
import { AppState } from "../../ReduxStore";
import { withHandlers, compose, lifecycle, setDisplayName } from "recompose";
import { lcUpdateLoginInformation, lcResetLoginComponentState } from "../../ReduxStore/LoginComponentSection/actions";
import { LoginComponentDumpView } from "./LoginComponentDumpView";
import { connect } from "react-redux";
import * as PCTypes from '../../ReduxStore/LoginComponentSection/types';
import { LoadingWindowHoc } from "../../HelperComponents/HocComponents/LoadingWindowHoc";

export interface LoginComponentState {
    dispatch: Dispatch;
    isLoading : boolean;
    loginEntity : LoginEntity;
    onUsernameChange: (props : LoginComponentState, value : string) => void;
    onPasswordChange: (props : LoginComponentState, value : string) => void;
    onLoginPressed: (props : LoginComponentState) => void;
    serverResponse : number;
    hasError : boolean;
    resetLoginState: (props : LoginComponentState) => void;
}

const mapStateToProps = (state: AppState) => ({
    isLoading : state.loginReducer.isLoading,
    loginEntity : state.loginReducer.loginData,
    serverResponse : state.loginReducer.serverResponse,
    hasError : state.loginReducer.error
});

function checkLoginValues(props : LoginComponentState) : boolean {
    if(props.loginEntity.username.length === 0) {
        alert("Username cannot be empty!");
    } else if(props.loginEntity.password.length === 0) {
        alert("Password cannot be empty!");
    } else {
        return true;
    }

    return false;
}

const myHandlers = withHandlers({
    onUsernameChange: (props : LoginComponentState) => (event : any, value : string) => {
        let loginUsername : string = value.trim();

        props.dispatch(lcUpdateLoginInformation(loginUsername, props.loginEntity.password))
    },

    onPasswordChange: (props : LoginComponentState) => (event : any, value : string) => {
        let loginPassword : string = value.trim();

        props.dispatch(lcUpdateLoginInformation(props.loginEntity.username, loginPassword))
    },

    onLoginPressed: (props : LoginComponentState) => (event : any) => {
        if(checkLoginValues(props)) {
            props.dispatch({type : PCTypes.LOGIN_USER, username : props.loginEntity.username, password : props.loginEntity.password})
        }
    },

    resetLoginState: (props : LoginComponentState) => (event : any) => {
        props.dispatch(lcResetLoginComponentState())
    }
})

const onComponentDidMount = lifecycle<LoginComponentState, {}, {}>({
    componentDidMount() {
        console.log("Error: " + this.props.hasError);
        console.log("ServerResponse: " + this.props.serverResponse);

        this.props.resetLoginState(this.props);
    }
})

const LoginComponentViewInitializer = compose<LoginComponentState, {}>(
    setDisplayName('LoginView'),
    connect(mapStateToProps),
    myHandlers,
    onComponentDidMount,
    LoadingWindowHoc
)(LoginComponentDumpView);

export default LoginComponentViewInitializer;


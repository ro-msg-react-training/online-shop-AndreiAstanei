import React from "react";
import '../../Styles/ComponentsStyles/LoginStyles/Login.scss';
import msgLogo from '../../Styles/ComponentsStyles/LoginStyles/msgLogo.png';
import { LoginComponentState } from "./LoginComponentSmartView";
import { ErrorComponent } from "../../HelperComponents/ErrorComponent";
import { WrongLoginCredentials } from "../../HelperComponents/WrongUsernameOrPassword";

export const LoginComponentDumpView: React.FC<LoginComponentState> = (props: LoginComponentState) => {
    if (props.serverResponse === 0 && !props.hasError) {
        return (
            <div id="LoginDisplay" className='container is-centered is-vcentered box is-family-primary'>
                <figure id="loginImage" className="image">
                    <img src={msgLogo} alt="msg logo" />
                </figure>

                <hr />

                <div className="field">
                    <label className="label is-medium has-text-primary">Username</label>
                    <p className="control has-icons-left">
                        <input className="input is-medium" placeholder="Username" onChange={(e) => props.onUsernameChange(props, e.target.value)} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user" />
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label is-medium has-text-primary">Password</label>
                    <p className="control has-icons-left">
                        <input className="input is-medium" type="password" placeholder="Password" onChange={(e) => props.onPasswordChange(props, e.target.value)} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock" />
                        </span>
                    </p>
                </div>

                <div className="field is-grouped has-addons has-addons-centered">
                    <div className="control">
                        <button className="button is-medium is-primary" onClick={() => props.onLoginPressed(props)}>Login</button>
                    </div>
                </div>
            </div>
        );
    } else if (props.serverResponse === 999 && props.hasError) {
        return (
            <ErrorComponent />
        );
    } else if (props.serverResponse === 401 && !props.hasError) {
        return (
            <WrongLoginCredentials />
        );
    } else {
        return (
            <ErrorComponent />
        );
    }
}
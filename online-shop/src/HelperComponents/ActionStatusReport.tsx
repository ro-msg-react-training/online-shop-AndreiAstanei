import React from "react";
import { Link } from "react-router-dom";
import '../Styles/ComponentsStyles/AppStyles/App.sass';

interface ActionStatusProps {
    wasSuccessful: boolean;
    message: string;
}

export const ActionStatusReport: React.FC<ActionStatusProps> = ({ wasSuccessful, message }) => {
    let textColor : string = wasSuccessful ? "has-text-success" : "has-text-danger";

    return (
        <div className = "container has-text-centered">
            <div className = {"has-text-weight-semi-bold is-size-3 " + textColor}>{message}</div>
            {console.log("Action status reposrt")}
            <Link to="/products">
                <div className={"button is-text is-medium " + textColor}>
                    Back to products catalog
                </div>
            </Link>
        </div>
    );
}
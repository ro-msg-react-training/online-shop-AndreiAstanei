import React from "react";
import { Link } from "react-router-dom";

export const WrongLoginCredentials : React.FC = () => {
    return (
        <div className = "container box has-text-centered">
            <div className = "has-text-primary is-size-4">
                Incorrect username or password entered!
            </div>
            
            <Link to="/login">
                <div className = "button is-text is-medium is-primary is-inverted">
                    Back to products catalog
                </div>
            </Link>
        </div>
    );
}
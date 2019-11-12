import React from 'react';

export const ErrorComponent : React.FC<{}> = () => {
    return (
        <div className="container box is-centered is-size-4 has-text-centered has-text-danger">The website is temporarily unreachable, please retry later.</div>
    );
}
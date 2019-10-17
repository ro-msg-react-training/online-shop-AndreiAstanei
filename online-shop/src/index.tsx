import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// *** Redux transition
import { configureStore } from './ReduxStore';
import { Provider } from 'react-redux';

const store = configureStore();

const Root = () => (
    <Provider store = { store }>
        <App />
    </Provider>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

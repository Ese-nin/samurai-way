import './index.css';
import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


export const renderEntireTree = () => {

    ReactDOM.render(
        <App store={store}/>,

        document.getElementById('root')
    );

}


renderEntireTree();
store.subscribe(renderEntireTree);
import store from "./Redux/State";
import ReactDOM from "react-dom";
import App from "./App";
import React from "react";

export const renderEntireTree = () => {

    ReactDOM.render(
        <App store={store}/>,

        document.getElementById('root')
    );

}
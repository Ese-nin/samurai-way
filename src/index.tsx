import './index.css';
import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";


export const renderEntireTree = () => {

    ReactDOM.render(
        /*<Provider store={store}>*/
            <App store={store}/>
        /*</Provider>*/
        ,

        document.getElementById('root')
    );

}


renderEntireTree();
store.subscribe(renderEntireTree);
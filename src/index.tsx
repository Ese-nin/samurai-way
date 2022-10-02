import './index.css';
import store from "./Redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "./StoreContext";
import {BrowserRouter} from "react-router-dom";


export const renderEntireTree = () => {

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
        ,

        document.getElementById('root')
    );

}


renderEntireTree();
store.subscribe(renderEntireTree);
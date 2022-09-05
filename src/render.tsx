import ReactDOM from "react-dom";
import App from "./App";
import React from "react";
import {addPost, RootStateType} from "./Redux/State";


export const rerenderEntireTree = (state: RootStateType) => {

    ReactDOM.render(
        <App state={state}
             addPost={addPost}/>,

        document.getElementById('root')
    );

}
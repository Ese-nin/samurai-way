import './index.css';
import state, {addPost, RootStateType, subscribe, updateNewPostText} from "./Redux/State";
import ReactDOM from "react-dom";
import App from "./App";
import React from "react";

const rerenderEntireTree = (state: RootStateType) => {

    ReactDOM.render(
        <App state={state}
             addPost={addPost}
             updateNewPostText={updateNewPostText}/>,

        document.getElementById('root')
    );

}
rerenderEntireTree(state);

subscribe(rerenderEntireTree);
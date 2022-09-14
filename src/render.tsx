import state, {addPost, updateNewPostText} from "./Redux/State";
import ReactDOM from "react-dom";
import App from "./App";
import React from "react";

export const renderEntireTree = () => {

    ReactDOM.render(
        <App state={state}
             addPost={addPost}
             updateNewPostText={updateNewPostText}/>,

        document.getElementById('root')
    );

}
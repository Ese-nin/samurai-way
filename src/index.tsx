import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PostType} from "./Components/Profile/MyPosts/MyPosts";
import {DialogItemPropsType} from "./Components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "./Components/Dialogs/Message/Message";

const postsData: Array<PostType> = [
    {id: 1, message: "Hallo, mein freund", likesCount: 3},
    {id: 2, message: "It's my first post", likesCount: 45},
    {id: 3, message: "Good bye", likesCount: 1792}
]

const dialogsData: Array<DialogItemPropsType> = [
    {id: 1, name: "Leonid"},
    {id: 2, name: "Victoria"},
    {id: 3, name: "Tamara"},
    {id: 4, name: "Stepan"},
    {id: 5, name: "George"},
    {id: 6, name: "Kate"},
    {id: 7, name: "Maria"}
]

const messagesData: Array<MessagePropsType> = [
    {id: 1, message: "Hi, how are you?"},
    {id: 2, message: "I'm busy"},
    {id: 3, message: "Where you from?"},
    {id: 4, message: "A-a-a-a-a-a"}
]

ReactDOM.render(
    <App postsData={postsData}
         dialogsData={dialogsData}
         messagesData={messagesData}/>,

    document.getElementById('root')
);
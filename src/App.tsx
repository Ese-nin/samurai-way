import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route,} from "react-router-dom";
import Music from "./Components/Music/Music";
import News from './Components/News/News';
import Settings from "./Components/Settings/Settings";
import {PostType} from "./Components/Profile/MyPosts/MyPosts";
import {MessagePropsType} from "./Components/Dialogs/Message/Message";
import {DialogItemPropsType} from "./Components/Dialogs/DialogItem/DialogItem";

type AppPropsType = {
    postsData: Array<PostType>
    messagesData: Array<MessagePropsType>
    dialogsData: Array<DialogItemPropsType>
}

const App = (props: AppPropsType) => {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path='/profile' render={() => <Profile postsData={props.postsData}/>}/>
                    <Route path='/dialogs' render={() => <Dialogs dialogsData={props.dialogsData} messagesData={props.messagesData}/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

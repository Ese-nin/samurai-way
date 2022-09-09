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
import {RootStateType, updateNewPostText} from "./Redux/State";

type AppPropsType = {
    state: RootStateType
    addPost: (message: string) => void
    updateNewPostText: (newText: string) => void
}

const App = (props: AppPropsType) => {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path='/profile' render={() => <Profile profileState={props.state.profilePage}
                                                                  addPost={props.addPost}
                                                                  updateNewPostText={props.updateNewPostText}/>}/>
                    <Route path='/dialogs' render={() => <Dialogs state={props.state.messagesPage}/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

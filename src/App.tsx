import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./Components/Music/Music";
import News from './Components/News/News';
import Settings from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import {StoreType} from "./Redux/redux-store";

type AppPropsType = {
    store: StoreType
}

const App = (props: AppPropsType) => {
    /*const state = useSelector(state => state)*/

    const state = props.store.getState()

    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path='/profile' render={() => <Profile profileState={state.profilePage}
                                                                  dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer state={state.messagesPage}
                                                                  dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

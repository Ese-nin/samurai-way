import React, {ComponentType} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import Music from "./Components/Music/Music";
import News from './Components/News/News';
import Settings from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeAppTC} from "./Redux/Reducers/app-reducer";
import {ReduxStateType} from "./Redux/redux-store";
import {Preloader} from "./Components/common/Preloader/Preloader";

class App extends React.Component<AllPropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {

        if (!this.props.initializedSuccess) {
            return <Preloader/>
        }

        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

type AllPropsType = MDTPType & MSTPType
type MDTPType = {
    initializeAppTC: () => void
}
type MSTPType = {
    initializedSuccess: boolean
}

const mstp = (state: ReduxStateType): MSTPType => {
    return {
        initializedSuccess: state.app.initializedSuccess
    }
}

export default compose<ComponentType>(
    withRouter,
    connect(mstp, {initializeAppTC})
)(App);

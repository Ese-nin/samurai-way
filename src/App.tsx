import React, {lazy, Suspense, useEffect} from 'react';
import 'App.css';
import {Navbar} from "Components/Navbar/Navbar";
import {HashRouter, Route, withRouter} from "react-router-dom";
import Music from "Components/Music/Music";
import News from 'Components/News/News';
import Settings from "Components/Settings/Settings";
import {LoginPage} from "Components/Login/Login";
import {Provider} from "react-redux";
import {store, useAppDispatch, useAppSelector} from "Redux/store";
import {Preloader} from "Components/common/Preloader/Preloader";
import {Header} from "Components/Header/Header";
import {getInitializedSuccess} from "Redux/selectors/app-selectors";
import {initializeAppTC} from "Redux/Reducers/app-reducer";

const Dialogs = lazy(() => import('Components/Dialogs/Dialogs'));
const UsersPage = lazy(() => import('Components/Users/UsersContainer'));
const ProfileContainer = lazy(() => import('Components/Profile/ProfileContainer'));

const App: React.FC = () => {

    const initializedSuccess = useAppSelector(getInitializedSuccess)

    const dispatch = useAppDispatch()

    const catchAllUnhandledErrors = () => {
        alert('Some error occured')
    }

    useEffect(()=>{
        dispatch(initializeAppTC())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)

        return ()=>{
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [])

    if (!initializedSuccess) {
        return <Preloader/>
    }

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={"app-wrapper-content"}>
                <Suspense fallback={<Preloader/>}>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <Dialogs/>}/>
                    <Route path='/users'
                           render={() => <UsersPage/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                    <Route path='/login'
                           render={() => <LoginPage/>}/>
                </Suspense>
            </div>
        </div>
    );
}

const AppContainer = withRouter(App);

const MainApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default MainApp;
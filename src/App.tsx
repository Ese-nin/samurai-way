import React, {lazy, Suspense, useEffect} from 'react';
import 'App.css';
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store, useAppDispatch, useAppSelector} from "Redux/store";
import {Preloader} from "Components/common/Preloader/Preloader";
// import {Header} from "Components/Header/Header";
import {getInitializedSuccess} from "Redux/selectors/app-selectors";
import {initializeAppTC} from "Redux/Reducers/app-reducer";
import Music from "./Components/Music/Music";
import News from "./Components/News/News";
import Settings from "./Components/Settings/Settings";
import {LoginPage} from "./Components/Login/Login";

import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/reset.css';
import {Header} from "./Components/Header/Header";

const {SubMenu} = Menu
const {Content, Footer, Sider} = Layout;

const Dialogs = lazy(() => import('Components/Dialogs/Dialogs'));
const UsersPage = lazy(() => import('Components/Users/UsersContainer'));
const ProfileContainer = lazy(() => import('Components/Profile/ProfileContainer'));
const ChatPageLazy = lazy(() => import('pages/chatPage/ChatPage'));

const App: React.FC = () => {

    const initializedSuccess = useAppSelector(getInitializedSuccess)

    const dispatch = useAppDispatch()

    const catchAllUnhandledErrors = () => {
        alert('Some error occured')
    }

    useEffect(() => {
        dispatch(initializeAppTC())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors)

        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
        }
    }, [])

    if (!initializedSuccess) {
        return <Preloader/>
    }

    return (

        <Layout>
            <Header/>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{height: '100%'}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
                                {/*<Menu.Item key="3">option 3</Menu.Item>*/}
                                {/*<Menu.Item key="4">option 4</Menu.Item>*/}
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                                <Menu.Item key="5"><Link to='/users'>Users</Link></Menu.Item>
                                <Menu.Item key="6"><Link to='/chatPage'>Chat</Link></Menu.Item>
                                {/*<Menu.Item key="7">option 7</Menu.Item>*/}
                                {/*<Menu.Item key="8">option 8</Menu.Item>*/}
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Other">
                                <Menu.Item key="9"><Link to='/music'>Music</Link></Menu.Item>
                                <Menu.Item key="10"><Link to='/news'>News</Link></Menu.Item>
                                <Menu.Item key="11"><Link to='/settings'>Settings</Link></Menu.Item>
                                {/*<Menu.Item key="12">option 12</Menu.Item>*/}
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={'/profile'}/>}/>
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
                                <Route path='/chatPage'
                                       render={() => <ChatPageLazy/>}/>
                                <Route path='*'
                                       render={() => <div>404 PAGE NOT FOUND</div>}/>
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Samurai-Way ©2023</Footer>
        </Layout>
    );
}

const AppContainer = withRouter(App);

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp;
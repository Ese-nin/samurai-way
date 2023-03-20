import React from "react";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {logOut} from "Redux/Reducers/auth-reducer";
import {getIsAuth, getLogin} from "Redux/selectors/auth-selectors";
import {Avatar, Button, Col, Layout, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


export const Header: React.FC = () => {

    const {Header} = Layout

    const isAuth = useAppSelector(getIsAuth)
    const login = useAppSelector(getLogin)

    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logOut())
    }

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <img
                        src={'https://img.freepik.com/premium-vector/star-logo_713663-134.jpg?w=826'}
                        alt={''} width={"50px"}/>
                </Col>

                {isAuth
                    ? <>
                        <Col span={2}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>} alt={login!}/>
                        </Col>
                        <Col span={4}>
                            <Button onClick={logoutHandler}>LogOut</Button>
                        </Col>
                    </>
                    :
                    <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}
            </Row>
        </Header>
    )
}
import React from 'react'
import {logIn} from "../../Redux/Reducers/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../Redux/store";
import {Redirect} from "react-router-dom";
import {getCaptchaUrl, getIsAuth} from "../../Redux/selectors/auth-selectors";
import {LoginForm} from "./LoginForm";


export const LoginPage: React.FC = () => {

    const isAuth = useAppSelector(getIsAuth)
    const captchaUrl = useAppSelector(getCaptchaUrl)

    const dispatch = useAppDispatch()

    const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => {
        dispatch(logIn(email, password, rememberMe, captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div style={{margin: "25px"}}>
        <h2>Login</h2>
        <LoginForm logIn={login} captchaUrl={captchaUrl}/>
    </div>
}


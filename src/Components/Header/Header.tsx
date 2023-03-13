import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {logOut} from "Redux/Reducers/auth-reducer";
import {getIsAuth, getLogin} from "Redux/selectors/auth-selectors";


export const Header: React.FC = () => {

    const isAuth = useAppSelector(getIsAuth)
    const login = useAppSelector(getLogin)

    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logOut())
    }

    return <div className={s.header}>
        <img
            src={'https://img.freepik.com/premium-vector/star-logo_713663-134.jpg?w=826'}
            alt={''}/>

        <div className={s.loginBlock}>
            {isAuth
                ? <div>{login} <button onClick={logout}>LogOut</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>

    </div>
}
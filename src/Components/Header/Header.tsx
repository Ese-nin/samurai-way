import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {AllPropsType} from "./HeaderContainer";


const Header = (props: AllPropsType) => {

    return <div className={s.header}>
        <img
            src={'https://playapkmod.com/files/2021/10/Download-Logo-Maker-Create-Logos-and-Icon-Design-Creator.png'}
            alt={''}/>

        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} <button onClick={props.logOut}>LogOut</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>

    </div>
}

export default Header;
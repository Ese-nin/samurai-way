import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {MapStatePropsType} from "./HeaderContainer";



const Header = (props: MapStatePropsType) => {
    return <div className={s.header}>
        <img
            src={'https://playapkmod.com/files/2021/10/Download-Logo-Maker-Create-Logos-and-Icon-Design-Creator.png'}
            alt={''}/>

        <div className={s.loginBlock}>
            { props.isAuth ? props.login : <NavLink to={'/auth/me'}>Login</NavLink>}
        </div>

    </div>
}

export default Header;
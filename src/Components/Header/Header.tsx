import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {AllPropsType} from "./HeaderContainer";


const Header = (props: AllPropsType) => {

    return <div className={s.header}>
        <img
            src={'https://img.freepik.com/premium-vector/star-logo_713663-134.jpg?w=826'}
            alt={''}/>

        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} <button onClick={props.logOut}>LogOut</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>

    </div>
}

export default Header;
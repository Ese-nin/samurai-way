import React from 'react'
import {NavLink} from "react-router-dom";

type LoginPagePropsType = {}

export const LoginPage = (props: LoginPagePropsType) => {

    return <>
        <div>
            <span>login</span> <br/>
            <input/>
        </div>
        <div>
            <span>password</span> <br/>
            <input type='password'/>
        </div>
        <button>
            <NavLink to={'/profile'}>Login</NavLink>
        </button>
    </>
}
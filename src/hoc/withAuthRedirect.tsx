import React, {ComponentType} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../Redux/redux-store";

type mstpType = {
    isAuth: boolean
}

const mstp = (state: AppRootStateType): mstpType => {
    return {
        isAuth: state.auth.isAuth
    }
}



export function withAuthRedirect<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) {

    const RedirectComponent = (props: mstpType) => {

        const {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to='/login'/>

        return <Component {...restProps as T}/>
    };

    return connect(mstp)(RedirectComponent)
}
import React, {ComponentType} from 'react'
import {Redirect} from "react-router-dom";
import {useAppSelector} from "Redux/store";
import {getIsAuth} from "Redux/selectors/auth-selectors";


export function withAuthRedirect<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) {

    return (props: T) => {

        const isAuth = useAppSelector(getIsAuth)

        if (!isAuth) return <Redirect to='/login'/>

        return <Component {...props}/>
    }
}
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import {logOut} from "../../Redux/Reducers/auth-reducer";

class HeaderContainer extends React.Component<AllPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

export type AllPropsType = MapStatePropsType & MapDispatchPropsType
type MapStatePropsType = {
    id: string | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
}
type MapDispatchPropsType = {
    logOut: () => void
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {logOut})(HeaderContainer)
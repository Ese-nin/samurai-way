import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {authMe, logOut} from "../../Redux/Reducers/auth-reducer";

class HeaderContainer extends React.Component<AllPropsType> {

    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return <Header {...this.props}/>
    }
}

export type AllPropsType = MapStatePropsType & MapDispatchPropsType
type MapStatePropsType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
}
type MapDispatchPropsType = {
    authMe: () => void
    logOut: () => void
}

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {authMe, logOut})(HeaderContainer)
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {authMe} from "../../Redux/Reducers/auth-reducer";

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return <Header {...this.props}/>
    }
}

export type MapStatePropsType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
}
type MapDispatchPropsType = {
    authMe: () => void
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

export default connect(mapStateToProps, {authMe})(HeaderContainer)
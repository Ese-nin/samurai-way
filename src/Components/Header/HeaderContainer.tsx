import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {setIsAuth, setUserData} from "../../Redux/Reducers/auth-reducer";
import {toggleIsFetching} from "../../Redux/Reducers/users-reducer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        authAPI.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.setIsAuth(true)
                    const {id, login, email} = data.data
                    this.props.setUserData(id, login, email)
                }

            });
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
    setUserData: (userID: string, email: string, login: string) => void
    toggleIsFetching: (isFetching: boolean) => void
    setIsAuth: (isAuth: boolean) => void
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

export default connect(mapStateToProps, {setUserData, toggleIsFetching, setIsAuth})(HeaderContainer)
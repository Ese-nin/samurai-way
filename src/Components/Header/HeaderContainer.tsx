import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {setIsAuth, setUserData} from "../../Redux/Reducers/auth-reducer";
import axios from "axios";
import {toggleIsFetching} from "../../Redux/Reducers/users-reducer";

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.setIsAuth(true)
                    const {id, login, email} = response.data.data
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
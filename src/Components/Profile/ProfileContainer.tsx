import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../Redux/Reducers/profile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & allPropsType

class ProfileContainer extends Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userID = this.props.match.params.userId
        this.props.getProfile(userID)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     isAuth={this.props.isAuth}/>
        )
    }
}

type allPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getProfile: (userID: string) => void
}


const mapStateToProps = (state: ReduxStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
});


export default withRouter(
    connect(mapStateToProps, {getProfile})
    (ProfileContainer)
)
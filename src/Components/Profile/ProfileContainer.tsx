import React, {Component, ComponentType} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getUserStatus, ProfileType, updateUserStatus} from "../../Redux/Reducers/profile-reducer";
import {AppRootStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & allPropsType

class ProfileContainer extends Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userID = '';
        let choosenUserID = this.props.match.params.userId
        if (this.props.authorizedUserID) {
            userID = choosenUserID ? choosenUserID : this.props.authorizedUserID
        }
        this.props.getProfile(userID)
        this.props.getUserStatus(userID)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatus}/>
        )
    }
}

type allPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserID: string | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getProfile: (userID: string) => void
    getUserStatus: (userID: string) => void
    updateUserStatus: (status: string) => void
}


const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.id,
    isAuth: state.auth.isAuth,
});

export default compose<ComponentType>(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

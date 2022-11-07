import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, ProfileType} from "../../Redux/Reducers/profile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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
                     profile={this.props.profile}/>
        )
    }
}

type allPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    profile: ProfileType | null
}

type mapDispatchToPropsType = {
    getProfile: (userID: string) => void
}


const mapStateToProps = (state: ReduxStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
});


export default withAuthRedirect(withRouter(
    connect(mapStateToProps, {getProfile})(ProfileContainer)
))
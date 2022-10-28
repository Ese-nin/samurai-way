import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../Redux/Reducers/profile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getProfile} from "../../api/api";

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & allPropsType

class ProfileContainer extends Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {userId = '26111'}
        getProfile(userId)
            .then(data => {
                this.props.setUserProfile(data);
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type allPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    profile: ProfileType | null
}

type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}


const mapStateToProps = (state: ReduxStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
});


export default withRouter(
    connect(mapStateToProps, {setUserProfile})
    (ProfileContainer)
)
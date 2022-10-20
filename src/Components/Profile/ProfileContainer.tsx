import React, {Component} from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../Redux/Reducers/profile-reducer";
import {ReduxStateType} from "../../Redux/redux-store";

class ProfileContainer extends Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

export type mapStateToPropsType = {
    profile: ProfileType | null
}

export type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}


const mapStateToProps = (state: ReduxStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)
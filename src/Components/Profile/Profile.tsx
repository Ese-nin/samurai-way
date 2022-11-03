import React from "react";
import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/Reducers/profile-reducer";
import {Redirect} from "react-router-dom";

type ProfilePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

const Profile = (props: ProfilePropsType) => {

    if (!props.isAuth) return <Redirect to='/login'/>

    return <div className={s.content}>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer />
    </div>
}

export default Profile;
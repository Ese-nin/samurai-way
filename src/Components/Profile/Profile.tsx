import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionTypes, profilePageType} from "../../Redux/store";

type ProfilePropsType = {
    profileState: profilePageType
    dispatch: (action: ActionTypes) => void
}

const Profile = (props: ProfilePropsType) => {

    return <div className={s.content}>
        <ProfileInfo/>
        <MyPosts postsData={props.profileState.posts}
                 dispatch={props.dispatch}
                 newPostText={props.profileState.newPostText}/>
    </div>
}

export default Profile;
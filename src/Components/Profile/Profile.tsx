import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../Redux/State";

type ProfilePropsType = {
    profileState: profilePageType
    addPost: (message: string) => void
    updateNewPostText: (newText: string)=> void
}

const Profile = (props: ProfilePropsType) => {

    return <div className={s.content}>
        <ProfileInfo/>
        <MyPosts postsData={props.profileState.posts}
                 addPost={props.addPost}
                 newPostText={props.profileState.newPostText}
                 updateNewPostText={props.updateNewPostText}/>
    </div>
}

export default Profile;
import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../Redux/State";

type ProfilePropsType ={
    state: profilePageType
}

const Profile = (props: ProfilePropsType) => {

    return <div className={s.content}>
        <ProfileInfo/>
        <MyPosts postsData={props.state.posts}/>
    </div>
}

export default Profile;
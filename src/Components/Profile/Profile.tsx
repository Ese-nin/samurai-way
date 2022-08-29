import React from "react";
import s from "./Profile.module.css"
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfilePropsType ={
    postsData: Array<PostType>
}

const Profile = (props: ProfilePropsType) => {

    return <div className={s.content}>
        <ProfileInfo/>
        <MyPosts postsData={props.postsData}/>
    </div>
}

export default Profile;
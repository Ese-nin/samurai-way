import React from "react";
import s from "./Profile.module.css"
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {

    const postsData: Array<PostType> = [
        {id: 1, message: "Hallo, mein freund", likesCount: 3},
        {id: 2, message: "It's my first post", likesCount: 45},
        {id: 3, message: "Good bye", likesCount: 1792}
    ]

    return <div className={s.content}>
        <ProfileInfo/>
        <MyPosts postsData={postsData}/>
    </div>
}

export default Profile;
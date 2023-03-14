import React from "react";
import s from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";

type PropsType = {
    isOwner: boolean
}

export const Profile: React.FC<PropsType> = (props) => {

    return <div className={s.content}>
        <ProfileInfo isOwner={props.isOwner}/>
        <MyPosts/>
    </div>
}
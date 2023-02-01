import React from "react";
import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/Reducers/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile = (props: ProfilePropsType) => {

    return <div className={s.content}>
        <ProfileInfo profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     isOwner={props.isOwner}
                     savePhoto={props.savePhoto}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;
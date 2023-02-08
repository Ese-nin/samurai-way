import React from "react";
import s from "./Profile.module.css"
import ProfileInfo, {FormikValues} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {DomainProfileDataType} from "api/api";

type ProfilePropsType = {
    profile: DomainProfileDataType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: FormikValues) => void
}

const Profile = (props: ProfilePropsType) => {

    return <div className={s.content}>
        <ProfileInfo profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     isOwner={props.isOwner}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;
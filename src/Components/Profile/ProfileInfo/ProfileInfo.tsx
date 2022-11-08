import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../Redux/Reducers/profile-reducer";
import {Preloader} from "../../Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: ProfileType | null
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    const {profile} = props

    if (!profile) {
        return <Preloader/>
    }

    const profilePhoto = profile.photos ? profile.photos.large : 'https://proxys.io/files/blog/arbit/logo_1.png'

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img className={s.avatar}
                         src={profilePhoto} alt={''}/>
                </div>
                <span><strong>{props.profile?.fullName}</strong></span>
                <ProfileStatus status="I'm a boss"/>
            </div>
        </div>
    );
};

export default ProfileInfo;
import React, {ChangeEvent} from 'react';
import s from "./ProfileInfo.module.css";
import profileLogo from "../../../assets/images/logo_1.png"
import {ProfileType} from "../../../Redux/Reducers/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (profile === null) {
        return <Preloader/>
    }

    const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const profilePhoto = profile.photos.large || profileLogo

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img className={s.avatar}
                         src={profilePhoto} alt={''}/>
                    {isOwner &&
                        <input className={s.changeAvatarInput}
                               type='file'
                               onChange={onAvatarSelected}/>
                    }
                </div>
                <span><strong>{profile?.fullName}</strong></span>
                <ProfileStatusWithHooks status={status}
                                        updateStatus={updateStatus}/>
            </div>
        </div>
    );
};

export default ProfileInfo;
import React, {ChangeEvent, FC, useState} from 'react';
import s from "./ProfileInfo.module.css";
import profileLogo from "assets/images/logo_1.png"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import {ProfileDataForm} from "./ProfileDataForm";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {getProfileSelector} from "Redux/selectors/profile-selectors";
import {savePhoto, saveProfile} from "Redux/Reducers/profile-reducer";
import {ContactsType} from "api/profile-api";

type ProfileInfoPropsType = {
    isOwner: boolean
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({isOwner}) => {

    const profile = useAppSelector(getProfileSelector)

    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    const profilePhoto = profile.photos.large || profileLogo

    const onSubmit = (values: FormikValues) => {
        dispatch(saveProfile(values))
        setEditMode(false)
    }

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

                {editMode
                    ? <ProfileDataForm profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData isOwner={isOwner} profile={profile} activateEditMode={() => setEditMode(true)}/>}


                <ProfileStatusWithHooks />
            </div>
        </div>
    );
};

// @ts-ignore
export type FormikValues = Pick<ProfileDataType, 'aboutMe'
    | 'lookingForAJob'
    | 'lookingForAJobDescription'
    | 'fullName'> & ContactsType

export type ProfileDataType = {
    profile: {
        aboutMe: string
        contacts: ContactsType
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        userId: number
    }
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData: FC<ProfileDataType> = ({profile, isOwner, activateEditMode}) => {
    return <div>
        <div>
            {isOwner && <button onClick={activateEditMode}>Edit</button>}
        </div>
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob && <div>
            <b>My skills:</b> {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            // @ts-ignore
            return <Contact key={key} title={key} value={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

type ContactProps = { title: string, value: string | null }

const Contact: FC<ContactProps> = ({title, value}) => {
    return <div className={s.contact}><b>{title}:</b>{' ' + value}</div>
}
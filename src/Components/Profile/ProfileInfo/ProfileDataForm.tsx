import React, {FC} from "react";
import {FormikValues, ProfileDataType} from "./ProfileInfo";
import s from "./ProfileInfo.module.css";
import {useFormik} from 'formik';
import * as Yup from "yup";

type ProfileDataFormType = Omit<ProfileDataType, 'isOwner' | 'activateEditMode'> & {
    onSubmit: (values: FormikValues) => void
}

export const ProfileDataForm: FC<ProfileDataFormType> = ({profile, onSubmit}) => {

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {
                facebook: profile.contacts.facebook,
                website: profile.contacts.website,
                vk: profile.contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink
            }
        },
        validationSchema: Yup.object({
                'contacts.facebook': Yup.string().url(),
                'contacts.website': Yup.string().url(),
                'contacts.vk': Yup.string().url(),
                'contacts.twitter': Yup.string().url(),
                'contacts.instagram': Yup.string().url(),
                'contacts.youtube': Yup.string().url(),
                'contacts.github': Yup.string().url(),
                'contacts.mainLink': Yup.string().url()
        }),
        onSubmit: values => {
            // @ts-ignore
            onSubmit(values)
        },
    });
    return (
        <form className={s.profileForm} onSubmit={formik.handleSubmit}>
            <label htmlFor="fullName">Full name </label>
            <input
                id="fullName"
                type="text"
                {...formik.getFieldProps('fullName')}
            />
            <label htmlFor="aboutMe">About me </label>
            <input
                id="aboutMe"
                type="textarea"
                {...formik.getFieldProps('aboutMe')}
            />
            <label htmlFor="lookingForAJob">Looking for a job </label>
            <input
                id="lookingForAJob"
                type="checkbox"
                {...formik.getFieldProps('lookingForAJob')}
            />
            <label htmlFor="lookingForAJobDescription">My skills </label>
            <input
                id="lookingForAJobDescription"
                type="textarea"
                {...formik.getFieldProps('lookingForAJobDescription')}
            />

            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <label>{key}</label>
                    <input
                        id={"contacts." + key}
                        type="text"
                        {...formik.getFieldProps('contacts.' + key)}
                    />
                </div>
            })}
            </div>

            <button type="submit">Save</button>
        </form>
    );
}


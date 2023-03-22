import {FormikValues} from "../Components/Profile/ProfileInfo/ProfileInfo";
import {instance, ResponseType} from "./api";

export const profileAPI = {
    getProfile: (userID: string) => {
        return instance.get<DomainProfileDataType>(`profile/` + userID)
            .then(res => res.data)
    },
    getProfileStatus: (userID: string) => {
        return instance.get<string>(`profile/status/` + userID)
            .then(res => res.data)
    },
    updateProfileStatus: (status: string) => {
        return instance.put<ResponseType>(`profile/status`, {status: status})
            .then(res => res.data)
    },
    savePhoto: (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
    },
    saveProfile: (profile: FormikValues, userId: string) => {
        return instance.put<ResponseType>(`profile`, {...profile, userId})
            .then(res => res.data)
    }
}


export type DomainProfileDataType = {
    aboutMe: string;
    contacts: ContactsType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: PhotosType;
}

export type PhotosType = {
    small: string | null;
    large: string | null;
}

export type ContactsType = {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
}
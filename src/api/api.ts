import axios from "axios";
import {FormikValues} from "Components/Profile/ProfileInfo/ProfileInfo";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5cd1a899-de0c-4c99-a4b1-a156f06021b6'
    }
})

export const usersAPI = {
    getUsers: function (currentPage: number = 1, pageSize: number = 5) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    unfollow: (userID: string) => {
        return instance.delete<ResponseType>(`follow/${userID}`)
            .then(res => res.data)
    },
    follow: (userID: string) => {
        return instance.post<ResponseType>(`follow/${userID}`)
            .then(res => res.data)
    }
}

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
        return instance.put<ResponseType<{ photos: Photos }>>(`profile/photo`, formData, {
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

export const authAPI = {
    authMe: () => {
        return instance.get<ResponseType<{ email: string, id: number, login: string }>>(`auth/me`)
            .then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
        return instance.post<ResponseType<{ id: number }>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{url: string}>('security/get-captcha-url')
            .then(res => res.data)
    }
}


// types

export enum ResultCodes {
    SUCCESS = 0,
    FAILED = 1,
    CAPTCHA = 10
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCodes
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

type Photos = {
    small: string | null;
    large: string | null;
}

export type DomainProfileDataType = {
    aboutMe: string;
    contacts: ContactsType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: Photos;
}

export type UsersType = {
    name: string;
    id: number;
    uniqueUrlName?: any;
    photos: Photos;
    status?: any;
    followed: boolean;
}

export type UsersResponseType = {
    items: UsersType[];
    totalCount: number;
    error?: any;
}
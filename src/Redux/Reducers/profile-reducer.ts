import {v1} from "uuid";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../../api/api";

type postsDataType = {
    id: string
    message: string
    likesCount: number
}
type postsType = Array<postsDataType>

export type profilePageType = {
    posts: postsType
    newPostText: string
    profile: ProfileType | null
    status: string
}

export type ProfileType = {
    aboutMe: string
    contacts: {}
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

type ActionTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof textareaChangeAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

export const textareaChangeAC = (postText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        payLoad: {
            newText: postText
        },
    } as const
}
export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        payLoad: {
            newPostText: postText
        },
    } as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE, profile
    } as const
}
export const setUserStatus = (status: string) => {
    return {
        type: SET_USER_STATUS, status
    } as const
}

const initialState = {
    profile: null,
    posts: [
        {id: v1(), message: "Hallo, mein freund", likesCount: 3},
        {id: v1(), message: "It's my first post", likesCount: 45},
        {id: v1(), message: "Good bye", likesCount: 1792}
    ],
    newPostText: "IT-Kamasutra",
    status: ""
};

const profileReducer = (state: profilePageType = initialState, action: ActionTypes): profilePageType => {

    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: v1(),
                message: action.payLoad.newPostText,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost], newPostText: ""};
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.payLoad.newText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_USER_STATUS:
            return {
                ...state, status: action.status
            }
        default:
            return state;
    }
}

export const getProfile = (userID: string) => {
    return (dispatch: Dispatch) => {
        usersAPI.getProfile(userID)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}
export const getUserStatus = (userID: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfileStatus(userID)
            .then(data => {
                dispatch(setUserStatus(data))
            })
    }
}
export const updateUserStatus = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateProfileStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })
    }
}


export default profileReducer;
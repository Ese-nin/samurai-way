import {v1} from "uuid";
import {Dispatch} from "redux";
import {profileAPI, ResultCodes} from "../../api/api";


const initialState = {
    profile: null,
    posts: [
        {id: v1(), message: "Hallo, mein freund", likesCount: 3},
        {id: v1(), message: "It's my first post", likesCount: 45},
        {id: v1(), message: "Good bye", likesCount: 1792}
    ],
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
            return {...state, posts: [newPost, ...state.posts]};
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

// actions

const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";

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


// thunks

export const getProfile = (userID: string) => async (dispatch: Dispatch) => {
    const data = await profileAPI.getProfile(userID)
    dispatch(setUserProfile(data));
}

export const getUserStatus = (userID: string) => async (dispatch: Dispatch) => {
    const data = await profileAPI.getProfileStatus(userID);
    dispatch(setUserStatus(data))
}

export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    const data = await profileAPI.updateProfileStatus(status);
    if (data.resultCode === ResultCodes.SUCCESS) {
        dispatch(setUserStatus(status))
    }
}

// types

type postsDataType = {
    id: string
    message: string
    likesCount: number
}
type postsType = Array<postsDataType>

export type profilePageType = {
    posts: postsType
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
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>


export default profileReducer;
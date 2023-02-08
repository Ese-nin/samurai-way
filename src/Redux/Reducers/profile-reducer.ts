import {v1} from "uuid";
import {Dispatch} from "redux";
import {DomainProfileDataType, profileAPI, ResultCodes} from "../../api/api";
import {FormikValues} from "Components/Profile/ProfileInfo/ProfileInfo";
import {AppRootStateType, ThunkAppDispatchType} from "../redux-store";


const initialState = {
    profile: null,
    posts: [
        {id: v1(), message: "Hallo, mein freund", likesCount: 3},
        {id: v1(), message: "It's my first post", likesCount: 45},
        {id: v1(), message: "Good bye", likesCount: 1792}
    ],
    status: ""
};

const profileReducer = (state: profilePageType = initialState, action: ActionsType): profilePageType => {
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
        case SAVE_PHOTO_SUCCESS:
            return {
                // @ts-ignore
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

// actions

const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS"

export const addPostAC = (postText: string) => {
    return {type: ADD_POST, payLoad: {newPostText: postText}} as const
}
export const setUserProfile = (profile: DomainProfileDataType) => {
    return {type: SET_USER_PROFILE, profile} as const
}
export const setUserStatus = (status: string) => {
    return {type: SET_USER_STATUS, status} as const
}
export const savePhotoSuccess = (photos: { large: string | null, small: string | null }) => {
    return {type: SAVE_PHOTO_SUCCESS, photos} as const
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

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodes.SUCCESS) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: FormikValues) => async (dispatch: ThunkAppDispatchType, getState: () => AppRootStateType) => {
    const userId = getState().auth.id
    await profileAPI.saveProfile(profile, userId!)
    dispatch(getProfile(userId!))

}

// types

type PostsDataType = {
    id: string
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: PostsDataType[]
    profile: DomainProfileDataType | null
    status: string
}

type ActionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof savePhotoSuccess>


export default profileReducer;
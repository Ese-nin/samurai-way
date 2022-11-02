import {v1} from "uuid";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

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

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

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

const initialState = {
    profile: null,
    posts: [
        {id: v1(), message: "Hallo, mein freund", likesCount: 3},
        {id: v1(), message: "It's my first post", likesCount: 45},
        {id: v1(), message: "Good bye", likesCount: 1792}
    ],
    newPostText: "IT-Kamasutra"
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

export default profileReducer;
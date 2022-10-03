import React from "react";
import {v1} from "uuid";

type postsDataType = {
    id: string
    message: string
    likesCount: number
}
type postsType = Array<postsDataType>

export type profilePageType = {
    posts: postsType
    newPostText: string
}

type ActionTypes = ReturnType<typeof addPostAC> | ReturnType<typeof textareaChangeAC>

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

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

const initialState = {
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
        default:
            return state;
    }
}

export default profileReducer;
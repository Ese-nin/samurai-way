import React from "react";
import {ActionTypes, profilePageType} from "../store";
import {v1} from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const textareaChangeAC = (postText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: postText,
    } as const
}
export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        newPostText: postText,
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

const profileReducer = (state: profilePageType = initialState, action: ActionTypes) => {

    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;
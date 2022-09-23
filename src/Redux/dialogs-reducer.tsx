import React from "react";
import {ActionTypes, messagesPageType, RootStateType} from "./State";
import {v1} from "uuid";
import profileReducer from "./profile-reducer";

const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";

export const addMessageAC = (messageText: string) => {
    return {
        type: ADD_MESSAGE,
        newMessageText: messageText,
    } as const
}
export const textareaMessageChangeAC = (messageText: string) => {
    return {
        type: UPDATE_MESSAGE_TEXT,
        newMessageText: messageText,
    } as const
}

const dialogsReducer = (state: messagesPageType, action: ActionTypes) => {

    switch (action.type) {
        case UPDATE_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText;
            return state;
        case ADD_MESSAGE:
            const newMessage = {
                id: v1(),
                message: action.newMessageText,
            };
            state.messages.push(newMessage);
            state.newMessageText = "";
            return state;
        default:
            return state;
    }
}

export default dialogsReducer;
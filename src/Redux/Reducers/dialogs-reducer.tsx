import React from "react";
import {ActionTypes, messagesPageType} from "../store";
import {v1} from "uuid";

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

const initialState = {
        dialogs: [
            {id: v1(), name: "Leonid"},
            {id: v1(), name: "Victoria"},
            {id: v1(), name: "Tamara"},
            {id: v1(), name: "Stepan"},
            {id: v1(), name: "George"},
            {id: v1(), name: "Kate"},
            {id: v1(), name: "Maria"}
        ],
        messages: [
            {id: v1(), message: "Hi, how are you?"},
            {id: v1(), message: "I'm busy"},
            {id: v1(), message: "Where you from?"},
            {id: v1(), message: "A-a-a-a-a-a"}
        ],
        newMessageText: "it-incubator",
    };

const dialogsReducer = (state: messagesPageType = initialState, action: ActionTypes) => {

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
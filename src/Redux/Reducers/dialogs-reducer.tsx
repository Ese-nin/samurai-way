import React from "react";
import {v1} from "uuid";

type messagesDataType = {
    id: string
    message: string
}
type dialogsDataType = {
    id: string
    name: string
}

export type dialogsType = Array<dialogsDataType>
export type messagesType = Array<messagesDataType>

export type messagesPageType = {
    messages: messagesType
    dialogs: dialogsType
    newMessageText: string
}

type ActionTypes = ReturnType<typeof addMessageAC> | ReturnType<typeof textareaMessageChangeAC>

const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";

export const addMessageAC = (messageText: string) => {
    return {
        type: ADD_MESSAGE,
        payLoad: {
            newMessageText: messageText
        },
    } as const
}
export const textareaMessageChangeAC = (messageText: string) => {
    return {
        type: UPDATE_MESSAGE_TEXT,
        payLoad: {
            newMessageText: messageText
        },
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

const dialogsReducer = (state: messagesPageType = initialState, action: ActionTypes): messagesPageType => {

    switch (action.type) {
        case UPDATE_MESSAGE_TEXT:
            return {...state, newMessageText: action.payLoad.newMessageText};
        case ADD_MESSAGE:
            const newMessage = {
                id: v1(),
                message: action.payLoad.newMessageText,
            };
            return {...state, messages: [...state.messages, newMessage], newMessageText: ""};
        default:
            return state;
    }
}

export default dialogsReducer;
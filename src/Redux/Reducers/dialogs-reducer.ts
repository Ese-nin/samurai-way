import {v1} from "uuid";


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
    ]
};

const dialogsReducer = (state: messagesPageType = initialState, action: DialogsActionsType): messagesPageType => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: v1(),
                message: action.payLoad.newMessageText,
            };
            return {...state, messages: [...state.messages, newMessage]};
        default:
            return state;
    }
}

// actions

const ADD_MESSAGE = "dialogs/ADD-MESSAGE";

export const addMessageAC = (messageText: string) => {
    return {
        type: ADD_MESSAGE,
        payLoad: {
            newMessageText: messageText
        },
    } as const
}


// types

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
}

export type DialogsActionsType = ReturnType<typeof addMessageAC>

export default dialogsReducer;
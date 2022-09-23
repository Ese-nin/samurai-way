import {v1} from "uuid";

type messagesDataType = {
    id: string
    message: string
}
type dialogsDataType = {
    id: string
    name: string
}
type postsDataType = {
    id: string
    message: string
    likesCount: number
}

type postsType = Array<postsDataType>
type dialogsType = Array<dialogsDataType>
type messagesType = Array<messagesDataType>

export type profilePageType = {
    posts: postsType
    newPostText: string
}
export type messagesPageType = {
    messages: messagesType
    dialogs: dialogsType
    newMessageText: string
}

export type RootStateType = {
    profilePage: profilePageType
    messagesPage: messagesPageType
    sidebar: {}
}
export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = ReturnType<typeof addPostAC> | ReturnType<typeof textareaChangeAC> |
    ReturnType<typeof textareaMessageChangeAC> | ReturnType<typeof addMessageAC>

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";

export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        newPostText: postText,
    } as const
}

export const addMessageAC = (messageText: string) => {
    return {
        type: ADD_MESSAGE,
        newMessageText: messageText,
    } as const
}

export const textareaChangeAC = (postText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: postText,
    } as const
}

export const textareaMessageChangeAC = (messageText: string) => {
    return {
        type: UPDATE_MESSAGE_TEXT,
        newMessageText: messageText,
    } as const
}

/*/!*const state = {
    profilePage: {
        posts: [
            {id: v1(), message: "Hallo, mein freund", likesCount: 3},
            {id: v1(), message: "It's my first post", likesCount: 45},
            {id: v1(), message: "Good bye", likesCount: 1792}
        ],
        newPostText: /!*"IT-Kamasutra"*!/ "Эщельбе бещельме"
    },
    messagesPage: {
        messages: [
            {id: v1(), message: "Hi, how are you?"},
            {id: v1(), message: "I'm busy"},
            {id: v1(), message: "Where you from?"},
            {id: v1(), message: "A-a-a-a-a-a"}
        ],
        dialogs: [
            {id: v1(), name: "Leonid"},
            {id: v1(), name: "Victoria"},
            {id: v1(), name: "Tamara"},
            {id: v1(), name: "Stepan"},
            {id: v1(), name: "George"},
            {id: v1(), name: "Kate"},
            {id: v1(), name: "Maria"}
        ]
    },
    sidebar: {}
}*!/

/!*export const addPost = () => {
    const newPost = {
        id: v1(),
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = "";
    onChange();
}*!/

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    onChange();
}

let onChange = () => {}

export const subscribe = (observer: () => void) => {
    onChange = observer
}*/

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: "Hallo, mein freund", likesCount: 3},
                {id: v1(), message: "It's my first post", likesCount: 45},
                {id: v1(), message: "Good bye", likesCount: 1792}
            ],
            newPostText: "IT-Kamasutra"
        },
        messagesPage: {
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
        },
        sidebar: {}
    },
    _onChange() {
    },

    subscribe(observer) {
        this._onChange = observer
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        if (action.type === "ADD-POST") {
            const newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._onChange();
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._onChange();
        } else if (action.type === "UPDATE-MESSAGE-TEXT") {
            this._state.messagesPage.newMessageText = action.newMessageText;
            this._onChange();
        } else if (action.type === "ADD-MESSAGE") {
            const newMessage = {
                id: v1(),
                message: action.newMessageText,
            };
            this._state.messagesPage.messages.push(newMessage);
            this._state.messagesPage.newMessageText = "";
            this._onChange();
        }
    },
}


export default store;
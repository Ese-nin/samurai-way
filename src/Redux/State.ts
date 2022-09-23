import {v1} from "uuid";
import profileReducer, {addPostAC, textareaChangeAC} from "./profile-reducer";
import dialogsReducer, {addMessageAC, textareaMessageChangeAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

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

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._onChange();
    },
}


export default store;
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
}

export type RootStateType = {
    profilePage: profilePageType
    messagesPage: messagesPageType
    sidebar: {}
}
export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (callback: () => void) => void
    getState: ()=> RootStateType
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
    },
    _onChange() {
    },
    addPost() {
        const newPost = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._onChange();
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._onChange();
    },
    subscribe(observer) {
        this._onChange = observer
    },
    getState() {
        return this._state
    }
}


export default store;
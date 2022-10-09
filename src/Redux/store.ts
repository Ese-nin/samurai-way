import {addPostAC, textareaChangeAC} from "./Reducers/profile-reducer";
import {addMessageAC, textareaMessageChangeAC} from "./Reducers/dialogs-reducer";

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

type profilePageType = {
    posts: postsType
    newPostText: string
}

type messagesPageType = {
    messages: messagesType
    dialogs: dialogsType
    newMessageText: string
}

type RootStateType = {
    profilePage: profilePageType
    messagesPage: messagesPageType
}
type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = ReturnType<typeof addPostAC> | ReturnType<typeof textareaChangeAC> |
    ReturnType<typeof textareaMessageChangeAC> | ReturnType<typeof addMessageAC>


/*
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

       // this._state.profilePage = profileReducer(this._state.profilePage, action);
       // this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);

        this._onChange();
    },
}*/

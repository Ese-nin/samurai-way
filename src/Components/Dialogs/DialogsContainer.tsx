import React from "react";
import {addMessageAC, dialogsType, messagesType, textareaMessageChangeAC} from "../../Redux/Reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ReduxStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = {
    dialogs: dialogsType
    messages: messagesType
    newMessageText: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    sendMessage: (text: string) => void
    textareaChange: (value: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newMessageText: state.messagesPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (text: string) => {
            dispatch(addMessageAC(text))
        },
        textareaChange: (value: string) => {
            dispatch(textareaMessageChangeAC(value))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Dialogs);
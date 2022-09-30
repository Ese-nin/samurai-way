import React from "react";
import {ActionTypes, messagesPageType} from "../../Redux/store";
import {addMessageAC, textareaMessageChangeAC} from "../../Redux/Reducers/dialogs-reducer";
import Dialogs from "./Dialogs";

type DialogsPropsType = {
    state: messagesPageType
    dispatch: (action: ActionTypes) => void
}

const DialogsContainer = (props: DialogsPropsType) => {

    const sendMessage = (text: string) => {
        props.dispatch(addMessageAC(text))
    }

    const textareaChange = (value: string) => {
        props.dispatch(textareaMessageChangeAC(value))
    }

    return <Dialogs dialogs={props.state.dialogs}
                    messages={props.state.messages}
                    newMessageText={props.state.newMessageText}
                    sendMessage={sendMessage}
                    textareaChange={textareaChange}/>
}

export default DialogsContainer;
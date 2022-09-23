import React, {createRef} from "react";
import s from "./Dialogs.module.css"
import DialogItem, {DialogItemPropsType} from "./DialogItem/DialogItem";
import Message, {MessagePropsType} from "./Message/Message";
import {ActionTypes, addMessageAC, messagesPageType, textareaMessageChangeAC} from "../../Redux/State";

type DialogsPropsType = {
    state: messagesPageType
    dispatch: (action: ActionTypes) => void
}

const Dialogs = (props: DialogsPropsType) => {

    const dialogItem = props.state.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    const message = props.state.messages.map(m =>
        <Message key={m.id} message={m.message} id={m.id}/>
    )

    const newMessage = createRef<HTMLTextAreaElement>()

    const sendMessage = () => {
        if (newMessage.current) {
            props.dispatch(addMessageAC(newMessage.current.value))
        }
    }

    const textareaChange = () => {
        if (newMessage.current) {
            props.dispatch(textareaMessageChangeAC(newMessage.current.value))
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogItem}
            </div>
            <div className={s.messages}>
                {message}
                <textarea
                    onChange={textareaChange}
                    value={props.state.newMessageText}
                    ref={newMessage}/>
                <div>
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
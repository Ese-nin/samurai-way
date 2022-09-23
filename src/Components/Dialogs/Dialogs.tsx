import React, {ChangeEvent, createRef} from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionTypes, messagesPageType} from "../../Redux/State";
import {addMessageAC, textareaMessageChangeAC} from "../../Redux/dialogs-reducer";

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

    const sendMessage = () => {
        props.dispatch(addMessageAC(props.state.newMessageText))
    }

    const textareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(textareaMessageChangeAC(e.currentTarget.value))
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
                    value={props.state.newMessageText}/>
                <div>
                    <button onClick={sendMessage}>
                        <img width={"17px"}
                             src={"https://toppng.com/uploads/preview/paper-airplane-symbol-11549404798w6cibysc3j.png"}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
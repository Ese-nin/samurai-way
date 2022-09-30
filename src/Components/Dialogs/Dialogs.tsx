import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogsType, messagesType} from "../../Redux/store";

type DialogsPropsType = {
    dialogs: dialogsType
    messages: messagesType
    newMessageText: string
    sendMessage: (text: string) => void
    textareaChange: (value: string) => void
}

const Dialogs = (props: DialogsPropsType) => {

    const dialogItem = props.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    const message = props.messages.map(m =>
        <Message key={m.id} message={m.message} id={m.id}/>
    )

    const sendMessage = () => {
        props.sendMessage(props.newMessageText)
    }

    const textareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.textareaChange(e.currentTarget.value)
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
                    value={props.newMessageText}/>
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
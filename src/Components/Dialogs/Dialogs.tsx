import React from "react";
import s from "./Dialogs.module.css"
import DialogItem, {DialogItemPropsType} from "./DialogItem/DialogItem";
import Message, {MessagePropsType} from "./Message/Message";
import {messagesPageType} from "../../Redux/State";

type DialogsPropsType = {
    state: messagesPageType
}

const Dialogs = (props: DialogsPropsType) => {

    const dialogItem = props.state.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    const message = props.state.messages.map(m =>
        <Message key={m.id} message={m.message} id={m.id}/>
    )

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogItem}
            </div>
            <div className={s.messages}>
                {message}
            </div>
        </div>
    )
}

export default Dialogs;
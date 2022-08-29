import React from "react";
import s from "./Dialogs.module.css"
import DialogItem, {DialogItemPropsType} from "./DialogItem/DialogItem";
import Message, {MessagePropsType} from "./Message/Message";

type DialogsPropsType = {
    messagesData: Array<MessagePropsType>
    dialogsData: Array<DialogItemPropsType>
}

const Dialogs = (props: DialogsPropsType) => {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {props.dialogsData.map(d =>
                    <DialogItem key={d.id} name={d.name} id={d.id}/>
                )}
            </div>
            <div className={s.messages}>
                {props.messagesData.map(m =>
                    <Message key={m.id} message={m.message} id={m.id}/>
                )}
            </div>
        </div>
    )
}

export default Dialogs;
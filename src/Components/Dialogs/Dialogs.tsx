import React from "react";
import s from "./Dialogs.module.css"
import DialogItem, {DialogItemPropsType} from "./DialogItem/DialogItem";
import Message, {MessagePropsType} from "./Message/Message";

const Dialogs = () => {

    const dialogsData: Array<DialogItemPropsType> = [
        {id: 1, name: "Leonid"},
        {id: 2, name: "Victoria"},
        {id: 3, name: "Tamara"},
        {id: 4, name: "Stepan"},
        {id: 5, name: "George"},
        {id: 6, name: "Kate"},
        {id: 7, name: "Maria"}
    ]

    const messagesData: Array<MessagePropsType> = [
        {id: 1, message: "Hi, how are you?"},
        {id: 2, message: "I'm busy"},
        {id: 3, message: "Where you from?"},
        {id: 4, message: "A-a-a-a-a-a"}
    ]

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsData.map(d =>
                    <DialogItem key={d.id} name={d.name} id={d.id}/>
                )}
            </div>
            <div className={s.messages}>
                {messagesData.map(m =>
                    <Message key={m.id} message={m.message} id={m.id}/>
                )}
            </div>
        </div>
    )
}

export default Dialogs;
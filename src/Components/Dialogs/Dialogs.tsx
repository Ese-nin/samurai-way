import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string
    id: number
}

type MessagePropsType = {
    id: number
    message: string
}

const DialogItem = (props: DialogItemPropsType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props: MessagePropsType) => {
    return <div className="s.dialog">{props.message}</div>
}

const Dialogs = () => {

    const dialogsData = [
        {id: 1, name: "Leonid"},
        {id: 2, name: "Victoria"},
        {id: 3, name: "Tamara"},
        {id: 4, name: "Stepan"},
        {id: 5, name: "George"},
        {id: 6, name: "Kate"},
        {id: 7, name: "Maria"}
    ]

    const messagesData = [
        {id: 1, message: "Hi, how are you?"},
        {id: 2, message: "I'm busy"},
        {id: 3, message: "Where you from?"},
        {id: 4, message: "A-a-a-a-a-a"}
    ]

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogsData.map(d =>
                    <DialogItem name={d.name} id={d.id}/>
                )}
            </div>
            <div className={s.messages}>
                {messagesData.map(m =>
                    <Message message={m.message} id={m.id}/>
                )}
            </div>
        </div>
    )
}

export default Dialogs;
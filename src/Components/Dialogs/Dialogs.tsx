import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string
    id: string
}

type MessagePropsType = {
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
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                <DialogItem name="Leonid" id="1"/>
                <DialogItem name="Victoria" id="2"/>
                <DialogItem name="Tamara" id="3"/>
                <DialogItem name="Stepan" id="4"/>
                <DialogItem name="George" id="5"/>
                <DialogItem name="Kate" id="6"/>
                <DialogItem name="Maria" id="7"/>
            </div>
            <div className={s.messages}>
                <Message message="Hi, how are you?"/>
                <Message message="I'm busy"/>
                <Message message="Where you from?"/>
                <Message message="A-a-a-a-a-a"/>
            </div>
        </div>
    )
}

export default Dialogs;
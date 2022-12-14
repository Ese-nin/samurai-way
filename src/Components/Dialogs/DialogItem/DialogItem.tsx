import React from 'react';
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

export type DialogItemPropsType = {
    name: string
    id: string
}

const DialogItem = (props: DialogItemPropsType) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog}>
            <NavLink to={path}
                     activeClassName={s.active}
            >{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
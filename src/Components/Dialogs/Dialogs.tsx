import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to="/dialogs/1">Leonid</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/2">Victoria</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/3">Tamara</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/4">Stepan</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/5">George</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/6">Kate</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/7">Maria</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi, how are you?</div>
                <div className={s.message}>I'm busy</div>
                <div className={s.message}>Where you from?</div>
                <div className={s.message}>A-a-a-a-a-a</div>
            </div>
        </div>
    )
}

export default Dialogs;
import React from "react";
import s from "./Dialogs.module.css"

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                <div className={s.dialog + ' ' + s.active}>
                    Leonid
                </div>
                <div className={s.dialog}>
                    Victoria
                </div>
                <div className={s.dialog}>
                    Tamara
                </div>
                <div className={s.dialog}>
                    Stepan
                </div>
                <div className={s.dialog}>
                    George
                </div>
                <div className={s.dialog}>
                    Kate
                </div>
                <div className={s.dialog}>
                    Maria
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
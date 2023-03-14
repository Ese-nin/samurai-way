import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {useDispatch} from "react-redux";
import {useAppSelector} from "Redux/store";
import {getDialogsSelector, getMessagesSelector} from "Redux/selectors/dialogs-selectors";
import {addMessageAC} from "Redux/Reducers/dialogs-reducer";
import {withAuthRedirect} from "hoc/withAuthRedirect";
import {AddMessageForm, FormDataType} from "./AddMessageForm";

const Dialogs: React.FC = () => {

    const dialogs = useAppSelector(getDialogsSelector)
    const messagesData = useAppSelector(getMessagesSelector)

    const dispatch = useDispatch()

    const dialogItem = dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    const messages = messagesData.map(m =>
        <Message key={m.id} message={m.message} id={m.id}/>
    )

    const addNewMessage = (formData: FormDataType) => {
        dispatch(addMessageAC(formData.newMessageBody))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogItem}
            </div>
            <div className={s.messages}>
                {messages}
                <AddMessageForm addNewMessage={addNewMessage}/>
            </div>
        </div>
    )
}

export default withAuthRedirect(Dialogs)
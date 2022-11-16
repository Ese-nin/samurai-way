import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


const Dialogs = (props: DialogsPropsType) => {

    const dialogItem = props.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    const messages = props.messages.map(m =>
        <Message key={m.id} message={m.message} id={m.id}/>
    )

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItem}>
                {dialogItem}
            </div>
            <div className={s.messages}>
                {messages}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

type FormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name='newMessageBody'
                       validate={[required, maxLength50]}
                       placeholder='Enter your message'/>
            </div>
            <div>
                <button type='submit'>
                    <img width={"17px"}
                         src={"https://toppng.com/uploads/preview/paper-airplane-symbol-11549404798w6cibysc3j.png"}
                         alt={""}/>
                </button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'AddMessageForm'})(AddMessageForm)

export default Dialogs;
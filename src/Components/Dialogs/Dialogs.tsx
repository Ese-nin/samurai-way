import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {useFormik} from "formik";
import * as Yup from 'yup';
import s2 from '../common/FormsControls/FormControl.module.css'


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
                <AddMessageForm addNewMessage={addNewMessage}/>
            </div>
        </div>
    )
}

type FormDataType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<{ addNewMessage: (formData: FormDataType) => void }> = ({addNewMessage}) => {

    const formik = useFormik({
        initialValues: {
            newMessage: ''
        },
        validationSchema: Yup.object({
            newMessage: Yup.string().max(50, 'Must be 50 characters or less')
        }),
        onSubmit: values => {
            addNewMessage({newMessageBody: values.newMessage})
            formik.resetForm()
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    id='newMessage'
                    placeholder='Enter your message'
                    {...formik.getFieldProps('newMessage')}
                />
                {formik.errors.newMessage && formik.touched.newMessage &&
                    <div className={s2.commonErrorMessage}>{formik.errors.newMessage}</div>}
            </div>
            <div>
                <button type='submit'>
                    Send
                </button>
            </div>
        </form>
    )
}

export default Dialogs;
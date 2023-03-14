import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import s from "./Dialogs.module.css";

export type FormDataType = {
    newMessageBody: string
}
export const AddMessageForm: React.FC<{ addNewMessage: (formData: FormDataType) => void }> = ({addNewMessage}) => {

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
                    <div className={s.commonErrorMessage}>{formik.errors.newMessage}</div>}
            </div>
            <div>
                <button type='submit'>
                    Send
                </button>
            </div>
        </form>
    )
}
import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import s2 from "../../common/FormsControls/FormControl.module.css";

export type FormDataType = {
    newPostBody: string
}
export const AddPostForm: React.FC<{ addNewPost: (value: FormDataType) => void }> = React.memo(({addNewPost}) => {

    const formik = useFormik({
        initialValues: {
            newPost: ''
        },
        validationSchema: Yup.object({
            newPost: Yup.string().max(30, 'Must be 30 characters or less')
        }),
        onSubmit: values => {
            addNewPost({newPostBody: values.newPost})
            formik.resetForm()
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    id="newPost"
                    placeholder={'Enter your text'}
                    {...formik.getFieldProps('newPost')}
                />
                {formik.errors.newPost && formik.touched.newPost &&
                    <div className={s2.commonErrorMessage}>{formik.errors.newPost}</div>}
            </div>
            <div>
                <button type='submit'>New post</button>
            </div>
        </form>
    )
})
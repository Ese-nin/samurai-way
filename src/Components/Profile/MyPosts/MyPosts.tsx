import React from "react";
import s from "./MyPosts.module.css";
import s2 from "../../common/FormsControls/FormControl.module.css";
import Post from "./Post/Post";
import {MyPostPropsType} from "./MyPostsContainer";
import {useFormik} from "formik";
import * as Yup from 'yup';

export type PostType = {
    id: string
    message: string
    likesCount: number
}

export const MyPosts = React.memo((props: MyPostPropsType) => {

    const posts = props.postsData.map(p =>
        <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    const addNewPost = (values: FormDataType) => {
        if (values.newPostBody.trim() !== '') {
            props.addPost(values.newPostBody)
        }
    }

    return <div className={s.content}>
        <div>
            <h3>My posts</h3>
            <div className={s.textareaBlock}>
                <AddPostForm addNewPost={addNewPost}/>
            </div>
        </div>
        {posts}
    </div>
})

export type FormDataType = {
    newPostBody: string
}

const AddPostForm: React.FC<{ addNewPost: (value: FormDataType) => void }> = ({addNewPost}) => {

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
}
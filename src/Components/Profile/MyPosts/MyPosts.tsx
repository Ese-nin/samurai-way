import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {MyPostPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type PostType = {
    id: string
    message: string
    likesCount: number
}

export const MyPosts = (props: MyPostPropsType) => {

    const posts = props.postsData.map(p =>
        <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    const addNewPost = (values: FormDataType) => {
        props.addPost(values.newPostBody)
    }

    return <div className={s.content}>
        <div>
            <h3>My posts</h3>
            <div className={s.textareaBlock}>
                <AddPostFormRedux onSubmit={addNewPost}/>
            </div>
        </div>
        {posts}
    </div>
}

type FormDataType = {
    newPostBody: string
}

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostBody' component='textarea' placeholder='Enter your text'/>
            </div>
            <div>
                <button type='submit'>New post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormDataType>({form: 'AddPostForm'})(AddPostForm)
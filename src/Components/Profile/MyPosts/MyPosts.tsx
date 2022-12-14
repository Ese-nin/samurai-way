import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {MyPostPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

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
})

export type FormDataType = {
    newPostBody: string
}

const maxLength30 = maxLengthCreator(30)

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostBody'
                       component={Textarea}
                       placeholder='Enter your text'
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <button type='submit'>New post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormDataType>({form: 'AddPostForm'})(AddPostForm)
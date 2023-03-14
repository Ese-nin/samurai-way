import React, {useCallback} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {AddPostForm, FormDataType} from "./AddPostForm";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {getPostsSelector} from "Redux/selectors/profile-selectors";
import {addPostAC} from "Redux/Reducers/profile-reducer";

export const MyPosts: React.FC = React.memo(() => {

    const postsData = useAppSelector(getPostsSelector)

    const dispatch = useAppDispatch()

    const posts = postsData.map(p =>
        <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    const addNewPost = useCallback((values: FormDataType) => {
        if (values.newPostBody.trim() !== '') {
            dispatch(addPostAC(values.newPostBody))
        }
    }, [addPostAC])

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
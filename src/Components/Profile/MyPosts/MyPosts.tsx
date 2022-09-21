import React, {createRef} from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {ActionTypes} from "../../../Redux/State";

type MyPostsPropsType = {
    postsData: Array<PostType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

export type PostType = {
    id: string
    message: string
    likesCount: number
}


const MyPosts = (props: MyPostsPropsType) => {

    const posts = props.postsData.map(p =>
        <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
    )

    const newPostElement = createRef<HTMLTextAreaElement>();

    const addPost = () => {
        if (newPostElement.current) {
            props.dispatch({type: "ADD-POST", newPostText: newPostElement.current.value});
        }
    }

    const textareaChange = () => {
        if (newPostElement.current) {
            props.dispatch({type: "UPDATE-NEW-POST-TEXT", newText: newPostElement.current.value});
        }
    }
    return <div className={s.content}>
        <div>
            <h3>My posts</h3>
            <div className={s.textareaBlock}>
                <div>
                    <textarea onChange={textareaChange}
                              ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>New post</button>
                </div>
            </div>
        </div>
        {posts}
    </div>
}
export default MyPosts;
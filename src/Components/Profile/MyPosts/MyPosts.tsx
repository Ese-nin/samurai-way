import React, {createRef} from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

type MyPostsPropsType = {
    postsData: Array<PostType>
    newPostText: string
    addPost: (text: string) => void
    onChangePost: (text: string)=>void
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
            let text = newPostElement.current.value
            props.addPost(text);
        }
    }

    const textareaChange = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.onChangePost(text);
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
import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

type MyPostsPropsType = {
    postsData: Array<PostType>
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}


const MyPosts = (props: MyPostsPropsType) => {

    return <div className={s.content}>
        <div>
            <h3>My posts</h3>
            <div className={s.textareaBlock}>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>New post</button>
                </div>
            </div>
        </div>
        {props.postsData.map(p =>
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
        )}
    </div>
}

export default MyPosts;
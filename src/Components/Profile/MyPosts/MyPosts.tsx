import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = () => {
    return <div className={s.content}>
        <div>
            <div>
                My posts
            </div>
            <div>
                <textarea></textarea>
                <button>New post</button>
            </div>
        </div>
        <Post/>
        <Post/>
        <Post/>
    </div>
}

export default MyPosts;
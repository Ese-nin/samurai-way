import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = () => {
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
        <Post message={'Hallo, mein freund'} likesCount={3}/>
        <Post message={"It's my first post"} likesCount={27}/>
        <Post message={"Good bye"} likesCount={999}/>
    </div>
}

export default MyPosts;
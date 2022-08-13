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
        <Post message={'Hallo, mein freund'} likesCount={3}/>
        <Post message={"It's my first post"} likesCount={27}/>
        <Post message={"Good bye"} likesCount={999}/>
    </div>
}

export default MyPosts;
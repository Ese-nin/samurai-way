import React from "react";
import s from "./Post.module.css"

const Post = () => {
    return (
        <div className={s.item}>
            <img src={"https://proxys.io/files/blog/arbit/logo_1.png"} alt={''}/>
            Post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
}

export default Post;
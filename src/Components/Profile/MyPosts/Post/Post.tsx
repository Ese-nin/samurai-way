import React from "react";
import s from "./Post.module.css"



const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={"https://proxys.io/files/blog/arbit/logo_1.png"} alt={''}/>
            {props.message}
            <div>
                <span>{props.count} like</span>
            </div>
        </div>
    )
}

export default Post;
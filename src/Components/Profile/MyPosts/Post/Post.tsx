import React from "react";
import s from "./Post.module.css"

type PostPropsType = {
    message: string
    likesCount: number
};

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={"https://proxys.io/files/blog/arbit/logo_1.png"} alt={''}/>
            {props.message}
            <div>
                <span>{props.likesCount} like</span>
            </div>
        </div>
    )
}

export default Post;
import React from "react";
import s from "./Post.module.css"
import postIcon from "../../../../assets/images/photo-small.jpg"

type PostPropsType = {
    message: string
    likesCount: number
};

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={postIcon} alt={''}/>
            {props.message}
            <div>
                <span>{props.likesCount} like</span>
            </div>
        </div>
    )
}

export default Post;
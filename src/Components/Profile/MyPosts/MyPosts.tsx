import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

type PostType = {
    id: number
    message: string
    likesCount: number
}


const MyPosts = () => {

    const postsData: Array<PostType> = [
        {id: 1, message: "Hallo, mein freund", likesCount: 3},
        {id: 2, message: "It's my first post", likesCount: 45},
        {id: 3, message: "Good bye", likesCount: 1792}
    ]

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
        {postsData.map(p =>
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
        )}
    </div>
}

export default MyPosts;
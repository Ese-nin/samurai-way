import React from "react";
import {ActionTypes} from "../../../Redux/store";
import {addPostAC, textareaChangeAC} from "../../../Redux/Reducers/profile-reducer";
import MyPosts, {PostType} from "./MyPosts";

type MyPostsContainerPropsType = {
    postsData: Array<PostType>
    dispatch: (action: ActionTypes) => void
    newPostText: string
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    const addPost = (text: string) => {
            props.dispatch(addPostAC(text));
        }

    const textareaChange = (text: string) => {
            props.dispatch(textareaChangeAC(text));
        }

    return <MyPosts addPost={addPost}
                    onChangePost={textareaChange}
                    postsData={props.postsData}
                    newPostText={props.newPostText}/>
}
export default MyPostsContainer;
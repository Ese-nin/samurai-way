import React from "react";
import {addPostAC, textareaChangeAC} from "../../../Redux/Reducers/profile-reducer";
import MyPosts, {PostType} from "./MyPosts";
import {connect} from "react-redux";
import {ReduxStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = {
    postsData: Array<PostType>
    newPostText: string
}
type MapDispatchPropsType = {
    addPost: (text: string) => void
    onChangePost: (text: string)=>void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
    return {
        postsData: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (text: string) => {
            dispatch(addPostAC(text));
        },
        onChangePost: (text: string) => {
            dispatch(textareaChangeAC(text));
        }
    }
}

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;
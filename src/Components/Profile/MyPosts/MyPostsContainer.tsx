import React from "react";
import {addPostAC} from "Redux/Reducers/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "Redux/store";
import {Dispatch} from "redux";

type PostType = {
    id: string
    message: string
    likesCount: number
}
type MapStatePropsType = {
    postsData: Array<PostType>
}
type MapDispatchPropsType = {
    addPost: (text: string) => void
}

// export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        postsData: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (text: string) => {
            dispatch(addPostAC(text));
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (MyPosts);
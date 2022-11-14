import React from "react";
import {addPostAC} from "../../../Redux/Reducers/profile-reducer";
import {MyPosts, PostType} from "./MyPosts";
import {connect} from "react-redux";
import {ReduxStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = {
    postsData: Array<PostType>
}
type MapDispatchPropsType = {
    addPost: (text: string) => void
}

export type MyPostPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: ReduxStateType): MapStatePropsType => {
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
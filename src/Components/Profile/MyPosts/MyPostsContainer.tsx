import React from "react";
import {addPostAC, textareaChangeAC} from "../../../Redux/Reducers/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";



const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            { (store) => {
               let state = store.getState()

                const addPost = (text: string) => {
                    store.dispatch(addPostAC(text));
                }

                const textareaChange = (text: string) => {
                    store.dispatch(textareaChangeAC(text));
                }

               return <MyPosts addPost={addPost}
                         onChangePost={textareaChange}
                         postsData={state.profilePage.posts}
                         newPostText={state.profilePage.newPostText}/>
            }}
        </StoreContext.Consumer>
    )
}
export default MyPostsContainer;
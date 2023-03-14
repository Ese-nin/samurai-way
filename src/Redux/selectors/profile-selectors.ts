import {AppRootStateType} from "../store";
import {DomainProfileDataType} from "api/api";
import {PostsDataType} from "../Reducers/profile-reducer";

export const getProfileSelector = (state: AppRootStateType): DomainProfileDataType | null => state.profilePage.profile
export const getProfileStatusSelector = (state: AppRootStateType): string => state.profilePage.status
export const getPostsSelector = (state: AppRootStateType): PostsDataType[] => state.profilePage.posts
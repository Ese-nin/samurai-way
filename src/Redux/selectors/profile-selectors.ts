import {AppRootStateType} from "../store";
import {PostsDataType} from "../Reducers/profile-reducer";
import {DomainProfileDataType} from "api/profile-api";

export const getProfileSelector = (state: AppRootStateType): DomainProfileDataType | null => state.profilePage.profile
export const getProfileStatusSelector = (state: AppRootStateType): string => state.profilePage.status
export const getPostsSelector = (state: AppRootStateType): PostsDataType[] => state.profilePage.posts
import {AppRootStateType} from "../redux-store";
import {UsersType} from "../Reducers/users-reducer";

export const getUsers = (state: AppRootStateType): Array<UsersType> => {
    return state.usersPage.users
}

export const getPageSize = (state: AppRootStateType): number => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppRootStateType): number => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppRootStateType): number => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppRootStateType): boolean => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppRootStateType): string[] => {
    return state.usersPage.followingInProgress
}
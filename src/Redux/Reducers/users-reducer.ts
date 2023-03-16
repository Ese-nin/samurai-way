import {ResponseType, ResultCodes, usersAPI, UsersType} from "api/api";
import {Dispatch} from "redux";
import {AppThunk} from "../store";


const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
}

const usersReducer = (state: InitialStateType = initialState, action: UsersActionTypes): InitialStateType => {
    switch (action.type) {
        case "users/FOLLOW":
        case "users/UNFOLLOW":
            return {
                ...state,
                users: state.users.map(el => el.id === +action.userID
                    ? {...el, followed: action.followed}
                    : el)
            }
        case "users/SET_USERS":
            return {...state, users: action.users}
        case 'users/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'users/SET_USERS_TOTAL_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'users/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'users/TOGGLE_IS_FOLLOWING':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(el => el !== action.userID)
            }
        case "users/SET_FILTER":
            return {
                ...state, filter: action.filter
            }

        default:
            return state
    }
}


// actions

export const followSuccess = (userID: string) => {
    return {
        type: "users/FOLLOW",
        userID: userID,
        followed: true
    } as const
}
export const unfollowSuccess = (userID: string) => {
    return {
        type: "users/UNFOLLOW",
        userID: userID,
        followed: false
    } as const
}
export const setUsers = (users: Array<UsersType>) => {
    return {
        type: "users/SET_USERS",
        users: users
    } as const
}
export const setFilter = (filter: FilterType) => {
    return {
        type: "users/SET_FILTER",
        filter: filter
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'users/SET_CURRENT_PAGE', currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'users/SET_USERS_TOTAL_COUNT', count: totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'users/TOGGLE_IS_FETCHING',
        isFetching: isFetching
    } as const
}
export const toggleIsFollowing = (isFetching: boolean, userID: string) => {
    return {
        type: 'users/TOGGLE_IS_FOLLOWING',
        isFetching, userID
    } as const
}


// thunks

export const requestUsers = (page: number, pageSize: number, filter: FilterType) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(toggleIsFetching(false))
    dispatch(setFilter(filter))
    dispatch(setCurrentPage(page))
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount))
}


const _followUnfollowFlow = async (apiMethod: (userId: string) => Promise<ResponseType>, userID: string,
                                  ActionCreator: (userID: string) => FollowSuccessActionType | UnfollowSuccessActionType,
                                  dispatch: Dispatch) => {
    dispatch(toggleIsFollowing(true, userID))
    const data = await apiMethod(userID)
    if (data.resultCode === ResultCodes.SUCCESS) {
        dispatch(ActionCreator(userID))
    }
    dispatch(toggleIsFollowing(false, userID))
}

export const followUser = (userID: string): AppThunk => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    await _followUnfollowFlow(apiMethod, userID, followSuccess, dispatch)
}

export const unfollowUser = (userID: string): AppThunk => async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    await _followUnfollowFlow(apiMethod, userID, unfollowSuccess, dispatch)
}

// types

export type FilterType = {
    term: string
    friend: null | boolean
}

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
    filter: FilterType
}

type FollowSuccessActionType = ReturnType<typeof followSuccess>
type UnfollowSuccessActionType = ReturnType<typeof unfollowSuccess>

export type UsersActionTypes = FollowSuccessActionType
    | UnfollowSuccessActionType
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowing>
    | ReturnType<typeof setFilter>

export default usersReducer;
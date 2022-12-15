import {ResultCodes, usersAPI} from "../../api/api";
import {Dispatch} from "redux";


const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(el => el.id === action.userID
                    ? {...el, followed: action.followed}
                    : el)
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(el => el !== action.userID)
            }


        default:
            return state
    }
}


// actions

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT'
export const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'users/TOGGLE_IS_FOLLOWING'

export const followSuccess = (userID: string) => {
    return {
        type: FOLLOW,
        userID: userID,
        followed: true
    } as const
}
export const unfollowSuccess = (userID: string) => {
    return {
        type: UNFOLLOW,
        userID: userID,
        followed: false
    } as const
}
export const setUsers = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        users: users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE, currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_USERS_TOTAL_COUNT, count: totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    } as const
}
export const toggleIsFollowing = (isFetching: boolean, userID: string) => {
    return {
        type: TOGGLE_IS_FOLLOWING,
        isFetching, userID
    } as const
}


// thunks

export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount))
}


const followUnfollowFlow = async (apiMethod: any, userID: string,
                                  ActionCreator: (userID: string) => FollowSuccessActionType | UnfollowSuccessActionType,
                                  dispatch: Dispatch) => {
    dispatch(toggleIsFollowing(true, userID))
    const data = await apiMethod(userID)
    if (data.resultCode === ResultCodes.SUCCESS) {
        dispatch(ActionCreator(userID))
    }
    dispatch(toggleIsFollowing(false, userID))
}

export const follow = (userID: string) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)

    // dispatch(toggleIsFollowing(true, userID))
    // const data = await usersAPI.follow(userID)
    // if (data.resultCode === ResultCodes.SUCCESS) {
    //     dispatch(followSuccess(userID))
    // }
    // dispatch(toggleIsFollowing(false, userID))
    followUnfollowFlow(apiMethod, userID, followSuccess, dispatch)
}

export const unfollow = (userID: string) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)

    // dispatch(toggleIsFollowing(true, userID))
    // const data = await apiMethod(userID)
    // if (data.resultCode === ResultCodes.SUCCESS) {
    //     dispatch(ActionCreator(userID))
    // }
    // dispatch(toggleIsFollowing(false, userID))
    followUnfollowFlow(apiMethod, userID, unfollowSuccess, dispatch)
}

// types

export type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
}
type PhotosType = {
    small: string
    large: string
}
export type UsersType = {
    id: string
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    location: { country: string, city: string }
}

type FollowSuccessActionType = ReturnType<typeof followSuccess>
type UnfollowSuccessActionType = ReturnType<typeof unfollowSuccess>

type ActionTypes = FollowSuccessActionType
    | UnfollowSuccessActionType
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowing>

export default usersReducer;
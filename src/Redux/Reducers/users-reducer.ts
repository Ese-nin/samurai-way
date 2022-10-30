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

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

type ActionTypes = ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowing>


const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.userID ? {...el, followed: true} : el)
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.userID ? {...el, followed: false} : el)
            }
        }
        case SET_USERS: {
            return {...state, users: action.payload.users}
        }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userID]
                    : state.followingInProgress.filter(el => el !== action.payload.userID)
            }


        default:
            return state
    }
}

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

export const follow = (userID: string) => {
    return {
        type: FOLLOW,
        payload: {
            userID: userID
        }
    } as const
}
export const unfollow = (userID: string) => {
    return {
        type: UNFOLLOW,
        payload: {
            userID: userID
        }
    } as const
}
export const setUsers = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        payload: {
            users: users
        },
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
        payload: {
            isFetching: isFetching
        }
    } as const
}
export const toggleIsFollowing = (isFetching: boolean, userID: string) => {
    return {
        type: TOGGLE_IS_FOLLOWING,
        payload: {
            isFetching, userID
        }
    } as const
}

export default usersReducer;
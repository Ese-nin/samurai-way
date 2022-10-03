
type InitialStateType = {
    users: Array<UsersType>
}
export type UsersType = {
    _id: string
    photoURL: string
    followed: boolean
    name: string
    status: string
    location: { country: string, city: string }
}

const initialState = {
    users: []
}

type ActionTypes = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>


const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(el => el._id === action.payload.userID ? {...el, followed: true} : el)
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(el => el._id === action.payload.userID ? {...el, followed: false} : el)
            }
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.payload.users]}
        }

        default:
            return state
    }
}

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

export const followAC = (userID: string) => {
    return {
        type: FOLLOW,
        payload: {
            userID: userID
        }
    } as const
}
export const unfollowAC = (userID: string) => {
    return {
        type: UNFOLLOW,
        payload: {
            userID: userID
        }
    } as const
}
export const setUsersAC = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        payload: {
            users: users
        },
    } as const
}

export default usersReducer;
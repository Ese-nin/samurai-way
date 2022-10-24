import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./users-reducer";

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
}

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

type ActionTypes = ReturnType<typeof setUserData>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setIsAuth>


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            debugger
            return {
                ...state,
                ...action.payload
            }
        }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload.isFetching
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload.isAuth
            }
        default:
            return state
    }
}

const SET_USER_DATA = "SET_USER_DATA";
const SET_IS_AUTH = 'SET_IS_AUTH';


export const setUserData = (userID: string, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userID, email, login
        }
    } as const
}
export const setIsAuth = (isAuth: boolean) => {
    return {
        type: SET_IS_AUTH,
        payload: {
            isAuth
        }
    } as const
}

export default authReducer;
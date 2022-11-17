import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./users-reducer";
import {authAPI} from "../../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {ReduxStateType, ThunkAppDispatchType} from "../redux-store";

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


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload.isFetching
            }
        default:
            return state
    }
}

const SET_USER_DATA = "SET_USER_DATA";

export const setUserData = (userID: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userID, email, login, isAuth
        }
    } as const
}

export const authMe = () => {
    return (dispatch: Dispatch) => {
        authAPI.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    const {id, login, email} = data.data
                    dispatch(setUserData(id, login, email, true))
                }
            });
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean): ThunkAction<void, ReduxStateType, unknown, ActionTypes> => {
    return (dispatch: ThunkAppDispatchType) => {
        authAPI.logIn(email, password, rememberMe)
            .then((data) => {
                if (data.resultCode === 0) {
                    dispatch(authMe())
                }
            })
    }
}

export const logOut = () => {
    return (dispatch: Dispatch) => {
        authAPI.logOut()
            .then((data) => {
                if (data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            })
    }
}


export default authReducer;
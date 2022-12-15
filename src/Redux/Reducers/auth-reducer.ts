import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./users-reducer";
import {authAPI, ResultCodes} from "../../api/api";
import {Dispatch} from "redux";
import {ThunkAppDispatchType} from "../redux-store";
import {stopSubmit} from "redux-form";


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
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

const SET_USER_DATA = "auth/SET_USER_DATA";

// actions
export const setUserData = (id: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id, email, login, isAuth
        }
    } as const
}

// thunks
export const authMe = () => async (dispatch: Dispatch) => {
    const data = await authAPI.authMe();
    if (data.resultCode === ResultCodes.SUCCESS) {
        const {id, login, email} = data.data
        dispatch(setUserData(id.toString(), login, email, true))
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkAppDispatchType) => {
    const data = await authAPI.logIn(email, password, rememberMe);
    if (data.resultCode === ResultCodes.SUCCESS) {
        await dispatch(authMe())
    } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logOut = () => async (dispatch: Dispatch) => {
    const data = await authAPI.logOut();
    if (data.resultCode === ResultCodes.SUCCESS) {
        dispatch(setUserData(null, null, null, false))
    }
}

// types

type InitialStateType = {
    id: string | null
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


export default authReducer;
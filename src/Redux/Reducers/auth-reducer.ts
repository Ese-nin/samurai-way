import {toggleIsFetching} from "./users-reducer";
import {ResultCodes} from "api/api";
import {AppThunk, ThunkAppDispatchType} from "../store";
import {stopSubmit} from "redux-form";
import {getProfile} from "./profile-reducer";
import {authAPI} from "../../api/auth-api";
import {securityAPI} from "../../api/security-api";

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case 'users/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL_SUCCESS';

// actions
export const setUserData = (id: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id, email, login, isAuth
        }
    } as const
}

const setCaptchaUrlSuccess = (captchaUrl: string) => {
    return {type: SET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const
}

// thunks
export const authMe = () => async (dispatch: ThunkAppDispatchType) => {
    const data = await authAPI.authMe();
    if (data.resultCode === ResultCodes.SUCCESS) {
        const {id, login, email} = data.data
        dispatch(setUserData(id.toString(), login, email, true))
        dispatch(getProfile(id.toString()))
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string | null): AppThunk => async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodes.SUCCESS) {
        await dispatch(authMe())
    } else if (data.resultCode === ResultCodes.CAPTCHA) {
        dispatch(getCaptchaUrl())
    } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logOut = (): AppThunk => async (dispatch) => {
    const data = await authAPI.logOut();
    if (data.resultCode === ResultCodes.SUCCESS) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): AppThunk => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captcha = data.url
    dispatch(setCaptchaUrlSuccess(captcha))
}

// types

type InitialStateType = {
    id: string | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
    captchaUrl: string | null
}

export type AuthActionsType = ReturnType<typeof setUserData>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setCaptchaUrlSuccess>


export default authReducer;
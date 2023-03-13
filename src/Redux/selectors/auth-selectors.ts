import {AppRootStateType} from "../store";

export const getIsAuth = (state: AppRootStateType): boolean => state.auth.isAuth


export const getCaptchaUrl = (state: AppRootStateType): string | null => state.auth.captchaUrl

export const getProfileId = (state: AppRootStateType) => state.auth.id

export const getEmail = (state: AppRootStateType) => state.auth.email

export const getLogin = (state: AppRootStateType) => state.auth.login

export const getIsFetching = (state: AppRootStateType) => state.auth.isFetching
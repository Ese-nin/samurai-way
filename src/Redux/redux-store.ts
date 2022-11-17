import dialogsReducer from "./Reducers/dialogs-reducer";
import profileReducer from "./Reducers/profile-reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import usersReducer from "./Reducers/users-reducer";
import authReducer from "./Reducers/auth-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type RootState = typeof rootReducer
export type ReduxStateType = ReturnType<RootState>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ThunkAppDispatchType = ThunkDispatch<ReduxStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<ReduxStateType> = useSelector

// @ts-ignore
window.store = store




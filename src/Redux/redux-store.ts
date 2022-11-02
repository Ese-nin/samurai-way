import dialogsReducer from "./Reducers/dialogs-reducer";
import profileReducer from "./Reducers/profile-reducer";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import usersReducer from "./Reducers/users-reducer";
import authReducer from "./Reducers/auth-reducer";
import thunkMiddleware from "redux-thunk"

export type RootState = typeof rootReducer
export type ReduxStateType = ReturnType<RootState>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store




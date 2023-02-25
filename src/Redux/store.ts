import dialogsReducer, {DialogsActionsType} from "./Reducers/dialogs-reducer";
import profileReducer, {ProfileActionsType} from "./Reducers/profile-reducer";
import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import usersReducer, {UsersActionTypes} from "./Reducers/users-reducer";
import authReducer, {AuthActionsType} from "./Reducers/auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import appReducer, {AppActionTypes} from "./Reducers/app-reducer";

export type RootState = typeof rootReducer
export type AppRootStateType = ReturnType<RootState>
type RootActionsType = AppActionTypes | AuthActionsType | DialogsActionsType | ProfileActionsType | UsersActionTypes

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    RootActionsType
>;

// @ts-ignore
window.store = store




import dialogsReducer from "./Reducers/dialogs-reducer";
import profileReducer from "./Reducers/profile-reducer";
import {combineReducers, legacy_createStore as createStore, Store} from "redux";
//import {ActionTypes} from "./store";
import usersReducer from "./Reducers/users-reducer";

/*export type ActionsType = ActionTypes*/
export type RootState = typeof rootReducer
export type ReduxStateType = ReturnType<RootState>

/*export type StoreType = Store<ReduxStateType, ActionsType>*/

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
})

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store




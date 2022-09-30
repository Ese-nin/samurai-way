import dialogsReducer from "./Reducers/dialogs-reducer";
import profileReducer from "./Reducers/profile-reducer";
import {combineReducers, legacy_createStore as createStore, Store} from "redux";
import {ActionTypes} from "./store";

export type ActionsType = ActionTypes
export type RootState = typeof reducers
export type ReduxStateType = ReturnType<RootState>

export type StoreType = Store<ReduxStateType, ActionsType>

const reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
})

let store = createStore(reducers);

export default store
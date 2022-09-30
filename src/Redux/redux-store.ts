import dialogsReducer from "./Reducers/dialogs-reducer";
import profileReducer from "./Reducers/profile-reducer";
import {combineReducers, legacy_createStore as createStore} from "redux";


const reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
})

let store = createStore(reducers);

export default store
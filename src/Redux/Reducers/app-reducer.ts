import {authMe} from "./auth-reducer";
import {AppThunk} from "../redux-store";


const initialState: InitialStateType = {
    initializedSuccess: false
}


const appReducer = (state = initialState, action: AppActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {...state, initializedSuccess: true}
        default:
            return state
    }
}

// actions

const INITIALIZE_APP = "app/INITIALIZE_APP";

export const initializeApp = () => {
    return {type: INITIALIZE_APP} as const
}


// thunks

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initializeApp())
}

// types

export type InitialStateType = {
    initializedSuccess: boolean
}

export type AppActionTypes = ReturnType<typeof initializeApp>


export default appReducer;
import {authMe} from "./auth-reducer";
import {ThunkAppDispatchType} from "../redux-store";


const initialState: InitialStateType = {
    initializedSuccess: false
}


const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

export const initializeAppTC = () => async (dispatch: ThunkAppDispatchType) => {
    await dispatch(authMe())
    dispatch(initializeApp())
}

// types

export type InitialStateType = {
    initializedSuccess: boolean
}

type ActionTypes = ReturnType<typeof initializeApp>


export default appReducer;
import {authMe} from "./auth-reducer";
import {ThunkAppDispatchType} from "../redux-store";

export type InitialStateType = {
    initializedSuccess: boolean
}

const initialState: InitialStateType = {
    initializedSuccess: false
}

type ActionTypes = ReturnType<typeof initializeApp>


const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {...state, initializedSuccess: true}
        default:
            return state
    }
}

const INITIALIZE_APP = "INITIALIZE_APP";

export const initializeApp = () => {
    return {type: INITIALIZE_APP} as const
}

export const initializeAppTC = () => (dispatch: ThunkAppDispatchType) => {
    dispatch(authMe())
    dispatch(initializeApp())
}

export default appReducer;
import {chatAPI, ChatMessageType} from "api/chat-api";
import {AppThunk, InferActionsTypes} from "../store";
import {Dispatch} from "redux";

const initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state: InitialStateType = initialState, action: ChatActionsType): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    })
}

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessagesHandler = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

export const startChatListening = (): AppThunk => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandler(dispatch))
}
export const stopChatListening = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandler(dispatch))
}
export const sendMessage = (message: string): AppThunk => (dispatch) => {
    chatAPI.sendMessage(message)
}


type InitialStateType = typeof initialState
export type ChatActionsType = InferActionsTypes<typeof actions>

export default chatReducer
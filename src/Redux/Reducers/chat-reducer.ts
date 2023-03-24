import {chatAPI, ChatMessageAPIType, ChatStatusType} from "api/chat-api";
import {AppThunk, InferActionsTypes} from "../store";
import {Dispatch} from "redux";
import {v1} from "uuid";

type ChatMessageType = ChatMessageAPIType & {id: string}

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as ChatStatusType
}

const chatReducer = (state: InitialStateType = initialState, action: ChatActionsType): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, i, array) => i >= array.length - 100)
            }
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChanged: (status: ChatStatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
    } as const)
}

let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessagesHandler = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null
const statusChangedHandler = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startChatListening = (): AppThunk => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandler(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandler(dispatch))
}
export const stopChatListening = (): AppThunk => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandler(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandler(dispatch))
}
export const sendMessage = (message: string): AppThunk => (dispatch) => {
    chatAPI.sendMessage(message)
}


type InitialStateType = typeof initialState
export type ChatActionsType = InferActionsTypes<typeof actions>

export default chatReducer
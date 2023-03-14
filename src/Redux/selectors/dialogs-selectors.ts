import {AppRootStateType} from "../store";

export const getDialogsSelector = (state: AppRootStateType) => state.messagesPage.dialogs

export const getMessagesSelector = (state: AppRootStateType) => state.messagesPage.messages
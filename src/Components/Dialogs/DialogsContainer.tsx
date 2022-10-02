import React from "react";
import {addMessageAC, textareaMessageChangeAC} from "../../Redux/Reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    const state = store.getState()

                    const sendMessage = (text: string) => {
                        store.dispatch(addMessageAC(text))
                    }

                    const textareaChange = (value: string) => {
                        store.dispatch(textareaMessageChangeAC(value))
                    }

                    return <Dialogs dialogs={state.messagesPage.dialogs}
                                    messages={state.messagesPage.messages}
                                    newMessageText={state.messagesPage.newMessageText}
                                    sendMessage={sendMessage}
                                    textareaChange={textareaChange}/>
                }
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;
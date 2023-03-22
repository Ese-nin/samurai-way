import React, {useEffect, useState} from 'react';
import {ChatMessageType} from "api/chat-api";
import {useAppDispatch, useAppSelector} from "../../Redux/store";
import {sendMessage, startChatListening, stopChatListening} from "../../Redux/Reducers/chat-reducer";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startChatListening())
        return () => {
            dispatch(stopChatListening())
        }
    }, [])

    // const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    //
    // useEffect(() => {
    //
    //     let ws: WebSocket;
    //     const closeHandler = () => {
    //         console.log('WebSocket close')
    //         setTimeout(createChannel, 3000)
    //     }
    //
    //     function createChannel() {
    //         ws?.removeEventListener('close', closeHandler)
    //         ws?.close()
    //         ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    //         ws.addEventListener('close', closeHandler)
    //         setWsChannel(ws)
    //     }
    //
    //     createChannel()
    //
    //     return () => {
    //         ws.removeEventListener('close', closeHandler)
    //         ws.close()
    //     }
    // }, [])

    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useAppSelector(state => state.chat.messages)

    return (
        <div style={{height: '450px', overflowY: 'auto'}}>
            {messages.map((m: ChatMessageType, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img width={'30px'} src={message.photo} alt='avatar'/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessage: React.FC<{}> = () => {

    const [text, setText] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //
    //     const openHandler = () => {
    //         setReadyStatus("ready")
    //     }
    //
    //     wsChannel?.addEventListener('open', openHandler)
    //
    //     return () => {
    //         wsChannel?.removeEventListener('open', openHandler)
    //     }
    // }, [wsChannel])

    const sendMessageHandler = () => {
        if (!text) {
            return
        }
        dispatch(sendMessage(text))
        // wsChannel?.send(text)
        setText('')
    }

    return (
        <div>
            <div>
                <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <button onClick={sendMessageHandler}>Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage;
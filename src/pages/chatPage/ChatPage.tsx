import React, {memo, useEffect, useRef, useState} from 'react';
import {ChatMessageAPIType} from "api/chat-api";
import {useAppDispatch, useAppSelector} from "Redux/store";
import {sendMessage, startChatListening, stopChatListening} from "Redux/Reducers/chat-reducer";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: React.FC = () => {

    const chatStatus = useAppSelector(state => state.chat.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startChatListening())
        return () => {
            dispatch(stopChatListening())
        }
    }, [])

    return (
        <div>
            {chatStatus === 'error' && <div>Reconnect failed. Refresh a page</div>}
                <>
                    <Messages/>
                    <AddMessage/>
                </>
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useAppSelector(state => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(()=>{
        isAutoScroll && messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 50) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return (
        <div style={{height: '450px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m: ChatMessageAPIType, index) => <Message key={index} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = memo(({message}) => {

    return (
        <div>
            <img width={'30px'} src={message.photo} alt='avatar'/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

const AddMessage: React.FC = () => {

    const [text, setText] = useState('')

    const chatStatus = useAppSelector(state => state.chat.status)
    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        if (!text) {
            return
        }
        dispatch(sendMessage(text))
        setText('')
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.shiftKey && e.key === 'Enter') {
            sendMessageHandler()
        }
    }

    return (
        <div>
            <div>
                <textarea onKeyDown={onKeyDownHandler} value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <button disabled={chatStatus !== 'ready'} onClick={sendMessageHandler}>Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage;
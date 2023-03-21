import React, {useEffect, useState} from 'react';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    userName: string
    userId: number
    photo: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: React.FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    )
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: '450px', overflowY: 'auto' }}>
            {messages.map(m => <Message message={m}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img width={'30px'} src={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessage: React.FC = () => {

    const [text, setText] = useState('')

    const sendMessage = () => {
        if (!text) {
            return
        }
        wsChannel.send(text)
        setText('')
    }

    return (
        <div>
            <div>
                <textarea value={text} onChange={(e)=>setText(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;
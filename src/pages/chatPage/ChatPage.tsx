import React, {useEffect, useState} from 'react';

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

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {

        let ws: WebSocket;
        const closeHandler = () => {
            console.log('WebSocket close')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessage wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {

        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return (
        <div style={{height: '450px', overflowY: 'auto'}}>
            {messages.map(m => <Message message={m}/>)}
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

const AddMessage: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [text, setText] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {

        const openHandler = () => {
            setReadyStatus("ready")
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!text) {
            return
        }
        wsChannel?.send(text)
        setText('')
    }

    return (
        <div>
            <div>
                <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus === 'pending'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;
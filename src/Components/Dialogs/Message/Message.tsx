import React from 'react';

export type MessagePropsType = {
    id: string
    message: string
}

const Message = (props: MessagePropsType) => {
    return <div className="s.dialog">{props.message}</div>
}

export default Message;
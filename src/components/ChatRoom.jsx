import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        axios.get('/localhost:8000/messages/')
            .then(response => setMessages(response.data))
            .catch(error => console.error(error));
    }, []);

    const sendMessage = () => {
        // Send message
        axios.post('/localhost:8000/messages/', { content: input })
            .then(response => {
                setMessages([...messages, response.data]);
                setInput('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <div>
                {/* {messages.map(message => (
                    <div key={message.id}>
                        <span>{message.user}: </span>
                        <span>{message.content}</span>
                    </div>
                ))} */}
            </div>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;

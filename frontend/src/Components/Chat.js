import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import SendMessageButton from './SendMessage';
import CookieContext from './CookieContext';
const Chat = () => {
    const context = useContext(CookieContext); 
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const helloBuddyBackendUrl = process.env.REACT_APP_HELLO_BUDDY_URL || 'http://localhost:3000';
    const helloBuggyMessageUrl = helloBuddyBackendUrl + '/message';
    console.log(`Hello Buggy Message URL: ${helloBuggyMessageUrl}`);
    const sendMessage = async () => {
        if (!message) return;
        setMessages(prevMessages => [...prevMessages, { type: 'sent', content: message }]);
        setMessage('Sending...');
        try {
            console.log(`Sending message: ${message}`);
            console.log(`Cookie: ${context.cookie}`);
            const res = await axios.post(helloBuggyMessageUrl, { prompt: message },{ 
                withCredentials: true,
                headers: { 'Cookie': context.cookie }
            });
            console.log(`Received response: ${res.data}`);
            const data = await res.data;
            setMessages(prevMessages => [...prevMessages, { type: 'received', content: data }]);
            setMessage('');
        } catch (error) {
            console.error(`Error sending message: ${error}`);
            setMessage('Uh oh! cannot contact Buddy.');
        }
    };

    useEffect(() => {
        console.log(`Cookie: ${context.cookie}`);
      }, [context.cookie]);

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#749977' 
            }}>
            <div style={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#749977'  }}>
                {messages.map((msg, index) => (
                    <Message key={index} msg={msg} />
                ))}
            </div>
            <div style={{ display: 'flex', padding: '10px', backgroundColor: '#749977'  }}>
                <input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown = {e => {
                        if (e.key === 'Enter') {
                            sendMessage();
                            e.preventDefault(); // Prevents the addition of a new line in the input after pressing 'Enter'
                        }
                    }}
                    style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <SendMessageButton onClick={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;
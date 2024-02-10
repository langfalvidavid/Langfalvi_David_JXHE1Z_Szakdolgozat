// const CreateRoom = () => {
//     return ( 
//     <>
    
//     create room
//     </>
//      );
// }
 
// export default CreateRoom;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socket = io();

    useEffect(() => {
        // Eseménykezelő a szerverről érkező üzenetekhez
        socket.on('message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Ha a komponens unmountolódik, zárd be a socket kapcsolatot
        return () => {
            socket.disconnect();
        };
    }, []);

    // Üzenet küldése a szerver felé
    const sendMessage = () => {
        socket.emit('message', inputMessage);
        setInputMessage('');
    };

    return (
        <div>
            <h1>Chat alkalmazás</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={inputMessage} 
                onChange={e => setInputMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Küldés</button>
        </div>
    );
};

export default ChatComponent;

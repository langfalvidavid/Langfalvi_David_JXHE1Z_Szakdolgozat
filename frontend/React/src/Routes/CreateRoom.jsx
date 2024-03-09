// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';

// // const CreateRoom = () => {
// //     const [messages, setMessages] = useState([]);
// //     const [inputMessage, setInputMessage] = useState('');
// //     const socket = io();

// //     useEffect(() => {
// //         // Eseménykezelő a szerverről érkező üzenetekhez
// //         socket.on('message', message => {
// //             setMessages(prevMessages => [...prevMessages, message]);
// //         });

// //         // Ha a komponens unmountolódik, zárd be a socket kapcsolatot
// //         return () => {
// //             socket.disconnect();
// //         };
// //     }, []);

// //     // Üzenet küldése a szerver felé
// //     const sendMessage = () => {
// //         socket.emit('message', inputMessage);
// //         setInputMessage('');
// //     };

// //     return (
// //         <div>
// //             <h1>Chat alkalmazás</h1>
// //             <div>
// //                 {messages.map((message, index) => (
// //                     <div key={index}>{message}</div>
// //                 ))}
// //             </div>
// //             <input 
// //                 type="text" 
// //                 value={inputMessage} 
// //                 onChange={e => setInputMessage(e.target.value)} 
// //             />
// //             <button onClick={sendMessage}>Küldés</button>
// //         </div>
// //     );
// // };

// // export default CreateRoom;



// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const CreateRoom = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [roomID, setRoomID] = useState('');
//     const [inviteEmail, setInviteEmail] = useState('');
//     const socket = io();

//     useEffect(() => {
//         // Eseménykezelő a szerverről érkező üzenetekhez
//         socket.on('message', message => {
//             setMessages(prevMessages => [...prevMessages, message]);
//         });

//         // Ha a komponens unmountolódik, zárd be a socket kapcsolatot
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     // Üzenet küldése a szerver felé
//     const sendMessage = () => {
//         socket.emit('message', inputMessage);
//         setInputMessage('');
//     };

//     // Szoba létrehozása
//     const createRoom = () => {
//         socket.emit('createRoom', roomID);
//         setRoomID('');
//     };

//     // Meghívó küldése
//     const sendInvitation = () => {
//         socket.emit('sendInvitation', roomID, inviteEmail);
//         setInviteEmail('');
//     };

//     return (
//         <div>
//             <h1>Játékszoba létrehozása és meghívás</h1>
//             <div>
//                 <input 
//                     type="text" 
//                     placeholder="Szoba azonosító" 
//                     value={roomID} 
//                     onChange={e => setRoomID(e.target.value)} 
//                 />
//                 <button onClick={createRoom}>Szoba létrehozása</button>
//             </div>
//             <div>
//                 <input 
//                     type="text" 
//                     placeholder="Meghívott email címe" 
//                     value={inviteEmail} 
//                     onChange={e => setInviteEmail(e.target.value)} 
//                 />
//                 <button onClick={sendInvitation}>Meghívó küldése</button>
//             </div>
//             <h2>Chat</h2>
//             <div>
//                 {messages.map((message, index) => (
//                     <div key={index}>{message}</div>
//                 ))}
//             </div>
//             <input 
//                 type="text" 
//                 value={inputMessage} 
//                 onChange={e => setInputMessage(e.target.value)} 
//             />
//             <button onClick={sendMessage}>Küldés</button>
//         </div>
//     );
// };

// export default CreateRoom;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const CreateRoom = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [roomID, setRoomID] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const socket = io();

    useEffect(() => {
        socket.on('message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', inputMessage);
        setInputMessage('');
    };

    const createRoom = () => {
        socket.emit('createRoom', roomID);
        setRoomID('');
    };

    const sendInvitation = () => {
        socket.emit('sendInvitation', roomID, inviteEmail);
        setInviteEmail('');
    };

    return (
        <div>
            <h1>Játékszoba létrehozása és meghívás</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Szoba azonosító" 
                    value={roomID} 
                    onChange={e => setRoomID(e.target.value)} 
                />
                <button onClick={createRoom}>Szoba létrehozása</button>
            </div>
            <div>
                <input 
                    type="text" 
                    placeholder="Meghívott email címe" 
                    value={inviteEmail} 
                    onChange={e => setInviteEmail(e.target.value)} 
                />
                <button onClick={sendInvitation}>Meghívó küldése</button>
            </div>
            <h2>Chat</h2>
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

export default CreateRoom;

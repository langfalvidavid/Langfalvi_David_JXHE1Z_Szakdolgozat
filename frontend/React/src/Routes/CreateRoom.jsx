// // const CreateRoom = () => {
// //     return ( 
// //     <>
    
// //     create room
// //     </>
// //      );
// // }
 
// // export default CreateRoom;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const CreateRoom = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
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

//     return (
//         <div>
//             <h1>Chat alkalmazás</h1>
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

import React, { useState } from 'react';
import io from 'socket.io-client';

const CreateRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const [invitationLink, setInvitationLink] = useState('');
    const socket = io('https://szakdoga-backend.vercel.app'); // Csere a megfelelő szerver címére és portra

    const createRoom = () => {
        const newRoomCode = generateRoomCode(); // Funkció, ami generál egy egyedi szobakódot
        setRoomCode(newRoomCode);
        setInvitationLink(window.location.origin + '/join/' + newRoomCode);
        socket.emit('createRoom', newRoomCode);
    };

    const generateRoomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    return (
        <div>
            <h1>Create Room</h1>
            <button onClick={createRoom}>Create Room</button>
            {roomCode && (
                <div>
                    <p>Room Code: {roomCode}</p>
                    <p>Invitation Link: <a href={invitationLink}>{invitationLink}</a></p>
                </div>
            )}
        </div>
    );
};

export default CreateRoom;

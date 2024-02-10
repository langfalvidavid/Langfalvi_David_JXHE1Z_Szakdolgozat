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
    const socket = io('https://szakdoga-backend.vercel.app'); // A szerver címét és portját itt állíthatod be

    const createRoom = () => {
        // Szerveroldali végpont meghívása a szoba létrehozásához
        fetch('https://szakdoga-backend.vercel.app/create-room', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            // Ha a válasz tartalmazza a szobakódot, beállítjuk és megjelenítjük
            if (data.roomCode) {
                setRoomCode(data.roomCode);
                setInvitationLink(`${window.location.origin}/join/${data.roomCode}`);
                // Csatlakozás a létrehozott szobához a socket.io segítségével
                socket.emit('joinRoom', data.roomCode);
            }
        })
        .catch(error => {
            console.error('Hiba történt a szoba létrehozása közben:', error);
        });
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


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
import { v4 as uuidv4 } from 'uuid';

const socket = io('https://szakdoga-zeta.vercel.app'); // Csatlakozás a szerverhez (a szerver URL-jével)

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);

    // Szoba létrehozása
    const createRoom = () => {
        const newRoom = {
            id: uuidv4(), // Egyedi szoba azonosító
            name: roomName,
        };
        socket.emit('createRoom', newRoom); // Szoba létrehozásának kérése a szerver felé
        setRooms(prevRooms => [...prevRooms, newRoom]); // Hozzáadás a lokális szobák listájához
        setRoomName(''); // Input mező törlése
    };

    // Szobanév beállítása
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    return (
        <div>
            <h1>Szoba létrehozása</h1>
            <input 
                type="text" 
                placeholder="Szoba neve" 
                value={roomName} 
                onChange={handleRoomNameChange}
            />
            <button onClick={createRoom}>Létrehozás</button>
            <div>
                <h2>Létrehozott szobák</h2>
                {rooms.map((room) => (
                    <div key={room.id}>{room.name}</div>
                ))}
            </div>
        </div>
    );
};

export default CreateRoom;

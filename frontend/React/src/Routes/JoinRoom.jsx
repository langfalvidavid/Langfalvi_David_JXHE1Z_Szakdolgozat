import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const JoinRoom = () => {
    const { roomCode } = useParams();
    const [roomPlayers, setRoomPlayers] = useState([]);
    const socket = io();

    // Csatlakozás a szobához
    const joinRoom = () => {
        socket.emit('joinRoom', roomCode);

        // Figyeljük a szobában lévő játékosok változásait
        socket.on('roomPlayers', players => {
            setRoomPlayers(players);
        });
    };

    return (
        <div>
            <h1>Join Room</h1>
            <p>Room Code: {roomCode}</p>
            <button onClick={joinRoom}>Join Room</button>
            <h2>Players in the room:</h2>
            <ul>
                {roomPlayers.map(playerID => (
                    <li key={playerID}>{playerID}</li>
                ))}
            </ul>
        </div>
    );
};

export default JoinRoom;

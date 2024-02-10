import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Routes/Login';
import Home from './Routes/Home';
import Register from './Routes/Register';
import ForgotPassword from './Routes/ForgotPassword';
import HomeUA from './Routes/HomeUA';
import Leaderboard from './Routes/Leaderboard';
import Personal from './Routes/Personal';
import Contact from './Routes/Contact';
import CreateRoom from './Routes/CreateRoom';
import JoinRoom from './Routes/JoinRoom'; // Új komponens a csatlakozáshoz

function App() {
  const loggedIn = window.localStorage.getItem('loggedIn');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeUA />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join/:roomCode" element={<JoinRoom />} /> {/* Új útvonal a csatlakozáshoz */}
          <Route path="/logout" element={<HomeUA />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

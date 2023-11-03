import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Routes/Login'
import Home from './Routes/Home'
import Register from './Routes/Register'
import ForgotPassword from './Routes/ForgotPassword'
import HomeUA from './Routes/HomeUA'
import Leaderboard from './Routes/Leaderboard'
import Personal from './Routes/Personal'
import Contact from './Routes/Contact'
import CreateRoom from './Routes/CreateRoom'


function App() {
 
  const loggedIn = window.localStorage.getItem("loggedIn")

  return (
    <>
     <BrowserRouter>
     <Routes>

      <Route path='/' element={<HomeUA/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/leaderboard' element={<Leaderboard/>}></Route>
      <Route path='/personal' element={<Personal/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/create-room' element={<CreateRoom/>}></Route>
      <Route path='/logout' element={<HomeUA/>}></Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

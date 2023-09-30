import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Register from './Register'
import ForgotPassword from './ForgotPassword'


function App() {
 
  const loggedIn = window.localStorage.getItem("loggedIn")

  return (
    <>
     <BrowserRouter>
     <Routes>

      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

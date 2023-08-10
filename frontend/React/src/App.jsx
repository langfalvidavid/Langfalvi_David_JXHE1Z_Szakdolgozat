import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Register from './Register'


function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>

      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

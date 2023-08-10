import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
const Login = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const [response, setResponse] = useState('')

const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/login', {username, password})
    .then(res => {console.log(res)
        if(res.data === 'Sikeres bejelentkezés!'){
    navigate('/')
} else{setResponse(res.data)}
    })
}

return (
    <div className='d-flex justify-content-center align-content-center'>
        
<form onSubmit={handleSubmit} className='w-50 bg-dark needs-validation rounded-0 novalidate' >
<h1 className='text-light w-50'>Bejelentkezés</h1>

<div className='mb-3 mt-5'>
<input type='text' className='form-control' placeholder='Felhasználónév / Email' autoComplete='off' required onChange={(e) =>setUsername(e.target.value)}></input>
</div>

<div className='mb-3 has-validation'>
<input type='password' className='form-control' id='password' placeholder='Jelszó' autoComplete='off' required onChange={(e) => setPassword(e.target.value)}></input>
<p className='text-danger text-center'>{response}</p>
</div>

<button type='submit' className='btn btn-outline-info mt-5 w-100 rounded-0'>Bejelentkezés</button>

</form>
    </div>
);
};

export default Login;
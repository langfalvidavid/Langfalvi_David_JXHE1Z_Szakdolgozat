import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const [response, setResponse] = useState('')

axios.defaults.withCredentials = true

const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('https://szakdoga-backend.vercel.app/login', {username, password})
    .then(res => {console.log(res)
        if(res.data === 'Sikeres bejelentkezés!'){
        navigate('/')
} else{setResponse(res.data)}
    })
}

return (
    <div style={{backgroundImage : "linear-gradient(to left bottom, #11b6f0, #00c1ea, #00cad5, #00d1b5, #08d48d)"}}>
    <div className='d-flex vh-100 w-50 m-auto border-danger align-items-center justify-content-center'>
        
<form onSubmit={handleSubmit} className='w-50 bg-dark needs-validation rounded-4 novalidate' >
<h1 className='text-light w-100 text-center mt-3'>Bejelentkezés</h1>

<div className='mb-3 mt-5'>
<input type='text' className='form-control text-center w-75 m-auto' placeholder='Felhasználónév' autoComplete='off' required onChange={(e) =>setUsername(e.target.value)}></input>
</div>

<div className='mb-3 has-validation'>
<input type='password' className='form-control text-center w-75 m-auto' id='password' placeholder='Jelszó' autoComplete='off' required onChange={(e) => setPassword(e.target.value)}></input>
<p className='text-danger text-center'>{response}</p>
</div>
<div className='w-100 h-50 d-flex justify-content-evenly my-4'>
<Link to='/forgot-password' className='btn btn-info text-center rounded-4 text-dark' >Elfelejtett jelszó</Link>
<Link to='/register' className='btn btn-info px-4 text-center rounded-4 text-dark' >Regisztráció</Link>
</div>
<div className='text-center'>
    <button type='submit' className='btn btn-info w-50 m-auto text-center rounded-4 text-dark mb-5'>Bejelentkezés</button>
        </div>

</form>
    </div>
    </div>
);
};

export default Login;
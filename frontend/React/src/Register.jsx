import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(password !== password2) return null
        axios.post('http://localhost:3000/register', {email, username, password})
        .then(result => {console.log(result)
        navigate('/login')
        })
        .catch(err => console.log(err))
    }
    
    let valid = password === password2 ? 'text-transparent' : 'd-block text-danger text-center mt-3 mb-0'

        return (
            <div className='d-flex vh-100 w-50 m-auto border-danger align-items-center justify-content-center'>
                
     <form onSubmit={handleSubmit} className='w-50 bg-dark needs-validation rounded-4 novalidate'>
     <h1 className='text-light w-100 text-center mt-3'>Regisztráció</h1>

    <div className='mb-3 mt-5 has-validation ' >
        <input type='email' className='form-control text-center w-75 m-auto' id='email' placeholder='Email' autoComplete='off' required onChange={(e) =>{setEmail(e.target.value)}}></input>
    </div>

    <div className='mb-3 has-validation '>
        <input type='text' className='form-control text-center w-75 m-auto' id='username' placeholder='Felhasználónév' autoComplete='off' required onChange={(e) =>{setUsername(e.target.value)}}></input>
    </div>
        
    <div className='mb-3 has-validation '>
        <input type='password' className='form-control text-center w-75 m-auto' id='password' placeholder='Jelszó' autoComplete='off' required onChange={(e) =>{setPassword(e.target.value)}}></input>
    </div>

    <div className='has-validation'>
        <input type='password' className='form-control text-center w-75 m-auto' id='password2' placeholder='Jelszó ismét' autoComplete='off' required onChange={(e) =>{setPassword2(e.target.value)}}></input>
        <p className={valid}>A jelszavak nem egyeznek!</p>
    </div> 
        <div className='text-center'>
    <button type='submit' className='btn btn-info w-50 m-auto text-center rounded-4 text-dark mb-5'>Bejelentkezés</button>
        </div>
    
     </form>
            </div>
        );
};

export default Register;
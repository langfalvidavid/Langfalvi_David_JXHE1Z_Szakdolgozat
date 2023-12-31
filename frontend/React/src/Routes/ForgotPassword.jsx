import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
const ForgotPassword = () => {

const [email, setEmail] = useState('')
const navigate = useNavigate()
const [message, setMessage] = useState('')

const [response, setResponse] = useState('')

const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('https://szakdolgozat-z4nt.onrender.com/forgot-password', {email})
    .then(res => {console.log(res)
        if(res.data === 'Email elküldve'){
            setResponse(res.data)
            setMessage('text-success text-center mt-3')
            setTimeout(()=>{
                navigate('/login')
            }, 5000)
} else{
    setResponse(res.data)
    setMessage('text-danger text-center mt-3')
}
    })
    .catch(err => console.log(err))

}


return (
    <div style={{backgroundImage : "linear-gradient(to left bottom, #11b6f0, #00c1ea, #00cad5, #00d1b5, #08d48d)"}}>

    <div className='d-flex vh-100 w-50 m-auto border-danger align-items-center justify-content-center'>
<form onSubmit={handleSubmit} className='w-50 bg-dark needs-validation rounded-4 novalidate' >
<h1 className='text-light w-100 text-center mt-3'>Elfelejtett jelszó</h1>
<div className='mb-3 mt-3'>
<input type='text' className='form-control text-center w-75 m-auto' placeholder='Email' autoComplete='off' required onChange={(e) =>setEmail(e.target.value)}></input>
<p className={message}>{response}</p>
</div>
<div className='text-center'>
    <button type='submit' className='btn btn-info w-50 m-auto text-center rounded-4 text-dark mb-5'>Küldés</button>
        </div>

</form>
    </div>
    </div>
);
};

export default ForgotPassword;

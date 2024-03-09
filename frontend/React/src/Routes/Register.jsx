// import React from 'react';
// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [email, setEmail] = useState('')
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [password2, setPassword2] = useState('')
//     const [errorMsg, setErrorMsg] = useState('')
//     const navigate = useNavigate()

// axios.defaults.withCredentials = true
    
//     const handleSubmit = (e) =>{
//         e.preventDefault()
//         if(password !== password2) return null
//         axios.post('https://szakdoga-backend.vercel.app/register', {email, username, password})
//         .then(res => {console.log(res)
//             if(res.data === 'Felhasználó létrehozva'){
//                 setTimeout(() =>{
//                     navigate('/login')
//                 },3000)
//             } else{
//                 return res.data
//             }
//         })
//         .catch(err => console.log(err))
//     }

//         return (
//             <div style={{backgroundImage : "linear-gradient(to left bottom, #11b6f0, #00c1ea, #00cad5, #00d1b5, #08d48d)"}}>

//             <div className='d-flex vh-100 w-50 m-auto border-danger align-items-center justify-content-center'>
                
//      <form onSubmit={handleSubmit} className='w-50 bg-dark needs-validation rounded-4 novalidate'>
//      <h1 className='text-light w-100 text-center mt-3'>Regisztráció</h1>

//     <div className='mb-3 mt-5 has-validation ' >
//         <input type='email' className='form-control text-center w-75 m-auto' id='email' placeholder='Email' autoComplete='off' required onChange={(e) =>{setEmail(e.target.value)}}></input>
//     </div>

//     <div className='mb-3 has-validation '>
//         <input type='text' className='form-control text-center w-75 m-auto' id='username' placeholder='Felhasználónév' autoComplete='off' required onChange={(e) =>{setUsername(e.target.value)}}></input>
//     </div>
        
//     <div className='mb-3 has-validation '>
//         <input type='password' className='form-control text-center w-75 m-auto' id='password' placeholder='Jelszó' autoComplete='off' required onChange={(e) =>{setPassword(e.target.value)}}></input>
//     </div>

//     <div className='has-validation'>
//         <input type='password' className='form-control text-center w-75 m-auto' id='password2' placeholder='Jelszó ismét' autoComplete='off' required onChange={(e) =>{setPassword2(e.target.value)}}></input>
//         <p className={errorMsg === '' && password === password2 ? 'text-transparent' : 'd-block text-danger text-center mt-3 mb-0' }>{(errorMsg === '') && (password !== password2) ? 'A jelszavak nem egyeznek!' : errorMsg}</p>
//     </div> 
//         <div className='text-center'>
//     <button type='submit' className='btn btn-info w-50 m-auto text-center rounded-4 text-dark mb-5'>Regisztráció</button>
//         </div>
    
//      </form>
//             </div>
//             </div>
//         );
// };

// export default Register;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const history = useHistory();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) return null;
        axios.post('https://szakdoga-backend.vercel.app/register', { email, username, password })
            .then(res => {
                console.log(res);
                if (res.data === 'Felhasználó létrehozva') {
                    setTimeout(() => {
                        history.push('/login'); // Átirányítás a '/login' útvonalra
                    }, 3000);
                } else {
                    return res.data;
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={{ backgroundImage: "linear-gradient(to left bottom, #11b6f0, #00c1ea, #00cad5, #00d1b5, #08d48d)" }}>

            <div className='d-flex vh-100 w-50 m-auto border-danger align-items-center justify-content-center'>

                <form onSubmit={handleSubmit} className='w-50 bg-dark needs-validation rounded-4 novalidate'>
                    <h1 className='text-light w-100 text-center mt-3'>Regisztráció</h1>

                    <div className='mb-3 mt-5 has-validation ' >
                        <input type='email' className='form-control text-center w-75 m-auto' id='email' placeholder='Email' autoComplete='off' required onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>

                    <div className='mb-3 has-validation '>
                        <input type='text' className='form-control text-center w-75 m-auto' id='username' placeholder='Felhasználónév' autoComplete='off' required onChange={(e) => { setUsername(e.target.value) }}></input>
                    </div>

                    <div className='mb-3 has-validation '>
                        <input type='password' className='form-control text-center w-75 m-auto' id='password' placeholder='Jelszó' autoComplete='off' required onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>

                    <div className='has-validation'>
                        <input type='password' className='form-control text-center w-75 m-auto' id='password2' placeholder='Jelszó ismét' autoComplete='off' required onChange={(e) => { setPassword2(e.target.value) }}></input>
                        <p className={errorMsg === '' && password === password2 ? 'text-transparent' : 'd-block text-danger text-center mt-3 mb-0'}>{(errorMsg === '') && (password !== password2) ? 'A jelszavak nem egyeznek!' : errorMsg}</p>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='btn btn-info w-50 m-auto text-center rounded-4 text-dark mb-5'>Regisztráció</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

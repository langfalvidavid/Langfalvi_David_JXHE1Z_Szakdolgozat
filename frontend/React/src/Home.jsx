import React, { useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import Navbar from './Navbar';

const Home = () => {
    axios.defaults.withCredentials = true
    
    
    return (
        
            <div className='vw-100 vh-100' style={{backgroundImage : "linear-gradient(to left bottom, #11b6f0, #00c1ea, #00cad5, #00d1b5, #08d48d)"}}> 
                <Navbar/>
            </div>
        
    );
};

export default Home;

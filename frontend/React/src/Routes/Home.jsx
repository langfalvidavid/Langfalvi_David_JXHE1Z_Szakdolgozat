import React, { useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';
import bgImg from '../images/bg-controller.jpg'




const Home = () => {

    const buttonStyle = 'p-2 w-25  rounded-3 bg-light text-decoration-none text-light text-md-center mb-2 text-dark font-weight-bold'
    const controller = `<img src={controllerImg} style={{objectFit:'fill', width:'10%'}} alt="controller" />`
    return (
        
        <div className='d-flex flex-column justify-content-between bg-dark' style={{height: "100vh", width: '100vw'}}> 
       
        <Navbar/>
       
        
            <div className='row' style={{height: '90%', marginTop:'2.9%', marginLeft:'0', width: '100%', backgroundImage: `url(${bgImg})`, backgroundSize:'cover'}}>
                <div className='col-9'>

                </div>

                <div style={{backgroundColor:'#313131'}} className='col-2 d-flex flex-column bg-dark'>
                    <Link to='/create-room' style={{marginTop:"50%", border:'2px solid purple'}} className={`${buttonStyle} w-100`}>Szoba létrehozása</Link>
                    <Link to='/stats' style={{border:'2px solid purple'}} className={`${buttonStyle} w-100 mt-4`}>Statisztikák</Link>
                
            </div>
            <div className='col-1'>

            </div>
            </div>
            
        <Footer/>
            
    </div>
        
    );
};

export default Home;

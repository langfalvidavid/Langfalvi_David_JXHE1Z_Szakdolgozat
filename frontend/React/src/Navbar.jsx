import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{


    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
    <div className="container-fluid">
    <Link to='/' className='navbar-brand' >Szócsata</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className=" collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item">
    <Link to='/login' className='nav-link mx-2'>Belépés</Link>
          </li>
          <li className="nav-item">
          <Link to='/register' className='nav-link mx-2'>Regisztráció</Link>

          </li>
          <li className="nav-item">
          <Link to='/contact' className='nav-link mx-2'>Kapcsolat</Link>

          </li>
          <li className="nav-item dropdown">
            <a className="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profil
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a className="dropdown-item" href="#">Személyes adatok</a></li>
              <li><a className="dropdown-item" href="#">Statisztika</a></li>
              <li><a className="dropdown-item" href="#">Contact us</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </nav>
        </div>
    )
}

export default Navbar;
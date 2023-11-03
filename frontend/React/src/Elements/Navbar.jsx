import React from 'react';
import {Link} from 'react-router-dom'

export default function Navbar() {
 

  return (
    <>
<nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link style={{marginLeft:'2%'}} className="navbar-brand" to="/">Szójáték</Link>
    <button style={{marginRight:'1%'}} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menü</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link active mb-2" aria-current="page" to="/login">Bejelentkezés</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mb-2" to="/register">Regisztráció</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mb-2" to="/contact">Kapcsolat</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle mb-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profil
            </a>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><Link className="dropdown-item mb-2" href="/leaderboard">Ranglista</Link></li>
              <li><Link className="dropdown-item mb-2" href="/personal">Személyes</Link></li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li><Link className="dropdown-item text-danger" href="/">Kijelentkezés</Link></li>
            </ul>
          </li>
        </ul>
        {/* <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </div>
</nav>
    </>
  );
}
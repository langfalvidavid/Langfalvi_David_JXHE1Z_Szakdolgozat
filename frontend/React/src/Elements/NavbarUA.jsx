import React from 'react';
import {Link} from 'react-router-dom'

export default function Navbar() {
 

  return (
    <>
<nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link style={{marginLeft:'2%'}} className="navbar-brand" to="/">Szójáték</Link>
    
  </div>
</nav>
    </>
  );
}
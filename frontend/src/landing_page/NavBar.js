import React from 'react';
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    // 1. Added 'border-bottom' for the subtle line under the nav
    // 2. Added 'sticky-top' (optional) if you want it to stay while scrolling like the real site
    <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
      
      {/* 3. Wrapped everything in a 'container' to give side margins like the image */}
      <div className="container p-2">
        
        <Link className="navbar-brand" to="/">
          <img src="media/images/logo.svg" style={{ width: "25%" }} alt="Logo" />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          {/* 5. Removed the empty <form> tag */}
          
          {/* 6. Changed 'mr-auto' to 'ms-auto' (margin-start: auto). 
                 This pushes the menu items to the RIGHT side. 
                 (Note: Use 'ml-auto' if you are using Bootstrap 4) */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/signup"}>Signup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/about"}>About</Link>
            </li>
            <li className="nav-item">
 <Link className="nav-link" to={"/products"}>Products</Link>            </li>
            <li className="nav-item">
 <Link className="nav-link" to={"/pricing"}>Pricing</Link>            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/support"}>Support</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
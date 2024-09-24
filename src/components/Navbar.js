import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    setIsSidebarOpen(true);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Check for authentication

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CloudNote</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={{ border: 'none', background: 'none', padding: 0 }}
                    onClick={handleProfileClick}
                  >
                    <img
                      src="https://www.w3schools.com/w3images/avatar2.png" // Change to your preferred image
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Log In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <SideBar show={isSidebarOpen} onClose={handleClose} />
    </>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';

const Navbar = ({mode, toggleMode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    setIsSidebarOpen(true);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CloudNote</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {isAuthenticated ? (
                <>
                  <li className="nav-item mx-3">
                    <div className="theme-toggle ms-3" onClick={toggleMode} style={{ cursor: 'pointer' }}>
                      {mode === 'light' ? (
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/000000/moon-symbol.png"
                          alt="Dark Mode"
                          width="30"
                          height="30"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/ffffff/sun--v1.png"
                          alt="Light Mode"
                          width="30"
                          height="30"
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      style={{ border: 'none', background: 'none', padding: 0 }}
                      onClick={handleProfileClick}
                    >
                      <img
                        src='https://www.w3schools.com/w3images/avatar2.png'
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </button>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item">
                    <div className="theme-toggle ms-3" onClick={toggleMode} style={{ cursor: 'pointer' }}>
                      {mode === 'light' ? (
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/000000/moon-symbol.png"
                          alt="Dark Mode"
                          width="30"
                          height="30"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/ffffff/sun--v1.png"
                          alt="Light Mode"
                          width="30"
                          height="30"
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </li>
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
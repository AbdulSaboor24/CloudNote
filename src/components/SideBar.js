import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import noteService from '../services/noteService';

const SideBar = ({ show, onClose }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/landing');
    onClose()
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await noteService.fetchUserDetails();
        setUserName(user.name);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    getUserDetails();
  }, []);

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="bg-dark text-white" style={{width: '320px'}}>
      <Offcanvas.Header closeButton >
        <Offcanvas.Title>CloudNote</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropup">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{userName}</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
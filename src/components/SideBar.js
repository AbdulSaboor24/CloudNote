import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

const SideBar = ({ show, onClose, profilePhoto }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token')


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/landing');
    window.location.reload()
    onClose();
  };

  useEffect(() => {
    const getUserDetails = async () => {
      if (!token) {
        console.warn('No authentication token found. Skipping user details fetch.');
        return;
      }
      try {
        const user = await UserService.fetchUserDetails();
        setUserName(user.name);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    getUserDetails();
  }, [token]);

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="bg-dark text-white" style={{ width: '320px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CloudNote</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page">
              Home
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropup">
          <Link
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={profilePhoto || "https://www.w3schools.com/w3images/avatar2.png"}
              alt="User Avatar"
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{userName}</strong>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link className="dropdown-item" onClick={handleLogout}>
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
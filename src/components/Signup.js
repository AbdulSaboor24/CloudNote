import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createUser`, {
        name, email, password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error("Error during sign-up:", err.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" id="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
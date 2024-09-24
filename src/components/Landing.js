import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Landing() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/notes');
    }
  }, [token, navigate]);

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to CloudNote</h1>
      <p>Cloud Storage for Notes. Store and manage your notes with ease and access them from anywhere.</p>
      <div className="mt-4">
        <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
        <Link to="/login" className="btn btn-secondary mx-2">Log In</Link>
      </div>
    </div>
  );
};

export default Landing;
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {

  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
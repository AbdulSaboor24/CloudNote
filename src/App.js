import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import NoteDetail from './components/NoteDetail';
import { useState } from 'react';

const App = () => {
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      document.body.style.color = 'white';
    } else {
      setMode('light'); 
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  };

  return (
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Home mode={mode}/>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/note/:id" element={<NoteDetail mode={mode}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
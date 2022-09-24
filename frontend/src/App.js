import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  })

  const handleLogout = () => {
    setAuth({
      user: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: ''
    });

    localStorage.removeItem('user');
  }

  return (
    <>
      <Navbar handleLogout={handleLogout} auth={auth} />
      <Routes>
        <Route path='/' element={<Register auth={auth} setAuth={setAuth} />} />
        <Route path='login' element={<Login auth={auth} setAuth={setAuth} />} />
        <Route path='dashboard' element={<Dashboard auth={auth} setAuth={setAuth} />} />
      </Routes>
    </>
  );
}

export default App;

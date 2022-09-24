import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

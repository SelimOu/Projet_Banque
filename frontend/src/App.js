import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Pages/Home';
import Dashboard from './Pages/dashboard';
import Register from './componants/register';
import CreateAccount from './componants/createAccount';
import UpdateAccount from './componants/updateAccount';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      {token && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/account/update/:id" element={<UpdateAccount />} />
        </>
      )}
    </Routes>
  );
}

export default App;

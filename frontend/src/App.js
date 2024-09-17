import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/dashboard';
import Register from './componants/register';
import CreateAccount from './componants/createAccount';
import UpdateAccount from './componants/updateAccount';
import Login from './componants/login';

const ProtectedRoute = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute token={token} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/account/update/:id" element={<UpdateAccount />} />
      </Route>
    </Routes>
  );
}

export default App;

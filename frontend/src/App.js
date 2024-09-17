import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/dashboard';
import Register from './componants/register';
import CreateAccount from './componants/createAccount';
import UpdateAccount from './componants/updateAccount';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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

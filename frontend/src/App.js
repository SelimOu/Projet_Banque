import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/dashboard'
import Register from './componants/register';
import CreateAccount from './componants/createAccount';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createaccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;

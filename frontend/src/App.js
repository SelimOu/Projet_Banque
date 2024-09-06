import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/dashboard'
import Register from './componants/register';
import CreateAccount from './componants/createAccount';
import UpdateAccount from './componants/updateAccount';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/account/update/:id" element={<UpdateAccount />} />
    </Routes>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import RegisterPage from './register.tsx';
import LoginPage from './login.tsx';
import LogoutPage from './Logout.tsx';
import HomePage from './components/HomePage.tsx';
// import LogoutButton from './LogoutButton.tsx';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page component */}
        <Route path="/register" element={<RegisterPage />} /> {/* About page component */}
        <Route path="/login" element={<LoginPage />} /> {/* Catch-all route for unmatched URLs */}
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import FrontPage from './Components/FrontPage/FrontPage';
import Milestones from './Components/Milestones/Milestones';
import Popular from './Components/Milestones/Popular';
import About from './Components/Pages/About/About';
import Support from './Components/Pages/Support/Support';
import Contact from './Components/Pages/Contact/Contact';
import Register from './Components/Register/Register';
import Company from './Components/Company/Company';
import Footer from './Components/Footer/Footer';
import Browse from './Components/Browse/Browse';
import Dropdown from './Components/Navbar/Dropdown';
import Profile from './Components/Pages/Profile/Profile';
import Login from './Components/Auth/Login';
import ForgotPassword from './Components/Auth/ForgotPassword';
import PostJobForm from './Components/Postjob/Postjobform';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('auth') === 'true';
    const token = sessionStorage.getItem('token');
    console.log('token', token);
    if (isAuth && token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div className="appp">
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        onProfileClick={toggleDropdown}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        onLogout={handleLogout}
      />
      {dropdownOpen && <Dropdown setLoggedIn={setLoggedIn} />}

      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FrontPage />
                <Milestones />
                <h1 id="cat">Popular categories</h1>
                <Popular a={'jobs'} n={8} />
                <h1 id="cat">Top Companies</h1>
                <Popular a={'companies'} n={4} />
              </>
            }
            />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/opportunity/:name" element={<Company />} />
          <Route path="/Postjob" element={<PostJobForm />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;

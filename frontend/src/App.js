import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

import { PublicRoute } from '@/routes/PublicRoute';

import { LOCAL_STORAGE_KEY } from '@/constants/config';
import { verify } from '@/actions/authActions';
import '@/styles/tailwind.css';
import 'focus-visible';


export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // Verify token on app load
  React.useEffect(() => {
    const authJwt = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const token = authJwt ? authJwt.access_token : null;
    if (token) {
      dispatch(verify(token));
    }
  }, [dispatch]);

  return (
    <Router>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
        <Footer />
    </Router>
  );
}
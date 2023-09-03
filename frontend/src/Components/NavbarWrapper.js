import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'


export const NavbarWrapper = () => {

    const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  if (isLoginPage || isSignupPage) {
    return null; 
  }

  return <Navbar />;
}

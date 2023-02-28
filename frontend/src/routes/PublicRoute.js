import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
      
  if (!isAuthenticated ) {
    return children
  }
    
  return <Navigate to="/" />
}

export default PublicRoute;

import React, { useContext } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function ProtectedRoute({ element: Component, ...rest }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  return <Route {...rest} element={Component} />;
}

export default ProtectedRoute;

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import validateToken from "../services/authService.js"; 
import Loading from "../Loading.jsx";

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await validateToken();
      
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading isLoading={loading}/>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
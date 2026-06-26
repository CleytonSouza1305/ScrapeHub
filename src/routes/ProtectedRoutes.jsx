import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import validateToken from "../services/authService.js"; 
import Loading from "../Loading.jsx";

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await validateToken();
      
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading isLoading={loading}/>
  }

  return user ? <Outlet context={user} /> : <Navigate to="/login" replace />;
};
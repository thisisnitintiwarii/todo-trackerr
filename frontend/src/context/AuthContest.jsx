import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../main";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {

    const checkAuth = async () => {

      try {
        const respond = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });

        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
             
    checkAuth();
  }, []);

  return(
    <AuthContext.Provider value = {{isAuth,setIsAuth}}>
        {children}
    </AuthContext.Provider>
  )

};

export const useAuth = () => useContext(AuthContext);

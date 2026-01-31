import React from 'react'
import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import Login from '../features/auth/Login.jsx'
import Signup from '../features/auth/SignUp.jsx'
import { useAuth } from '../context/AuthContest.jsx'
import Home from "../pages/Home.jsx"


export default function Router(){
    
    const {isAuth} = useAuth();
    
    return(

    <BrowserRouter>
        <Routes>
        <Route path="/login" element={isAuth? <Navigate to="/"/> : <Login/>} />
        <Route path="/signup" element={isAuth? <Navigate to="/"/> : <Signup/>} />
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/" : "/login"} />}
        />
        </Routes>
    </BrowserRouter>

    )
}

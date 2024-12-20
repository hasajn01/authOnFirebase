import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Home from "./components/Home";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
   const [user, setUser] = useState(null)

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user)
      })
      
      return () => unsubscribe();
   }, [])

   console.log(user)
  return (
     <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={user ? <Home username={user} /> : <Navigate to='/login'/>}/>
        <Route path="*" element={<Navigate to='/login'/>}/>
     </Routes>
  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
import { createRoot } from "react-dom/client";
import Login from './components/Login'
import Home from './components/Home'


import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/Home",
    element: <div>
      <Home></Home>
    </div>
    
  },



  {
    path: "/Login",
    element: <div>
      <Login></Login>
    </div>
    
    
  },
  {
    path: "/Register",
    element: <div>
      <Register></Register>
    </div>,
  },
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App

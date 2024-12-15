import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-toastify/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <div>
    <StrictMode>
      <App />
    </StrictMode>
  </div>
);
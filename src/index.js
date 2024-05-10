// import statements
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App'; // assuming App.js is in the same directory

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>  
);
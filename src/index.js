import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import butter from './butter.js';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

//butter.cleanup();

        root.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

reportWebVitals();

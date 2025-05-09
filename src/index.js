import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import butter from './butter.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

butter.cleanup();

if (window.innerWidth > 768) {
    butter.init({
        wrapperDamper: 0.04
    });
}


root.render(
    <React.StrictMode>
        <App />
        <div className="credits">
            © 2025 Jorit Doeswijk. KVK: 97069280
        </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

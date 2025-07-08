import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import butter from './butter.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

butter.cleanup();

// Determine if mobile or desktop before importing App/AppMobile
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    // Desktop
    import('./App').then(({ default: App }) => {
        butter.init({
            wrapperDamper: 0.045
        });

        root.render(
            <div>
                <App />
                <div className="credits">
                    © 2025 Jorit Doeswijk. KVK: 97069280
                </div>
            </div>
        );
    });
} else {
    // Mobile
    import('./AppMobile').then(({ default: AppMobile }) => {
        root.render(
            <React.StrictMode>
                <AppMobile />
            </React.StrictMode>
        );
    });
}

reportWebVitals();
import React from 'react';
import './../css/Preloader.sass';

function Preloader({ isActive = true }) {
    return (
        <div className={`preloader${isActive ? ' active' : ''}`}>
            <div className="loader">
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Preloader;

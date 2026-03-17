import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/Hero.css';
import photo12 from './../img/photo12.webp';

function Hero() {
    const navigate = useNavigate();

    return (
        <div className="section hero fade-in">
            <div className="section-wrapper">
                <div className="section-title ">
                    Rust en richting bij autisme<br />
                    en prikkelverwerking
                </div>
                <div className="section-bio">
                    Ik ben Jorit Doeswijk, NVO geregistreerd Orthopedagoog, met als specialisme Sensorische Informatieverwerking (zintuiglijke informatieverwerking), autisme en verstandelijke beperking.
                </div>
                <div className="hero-cta-container">
                    <div className="hero-cta clickable" onClick={() => navigate('/overmij')}>
                        Meer over mij
                    </div>
                    <div className="hero-cta clickable" onClick={() => navigate('/hoeikhelp')}>
                        Hoe ik help
                    </div>
                </div>
            </div>
            <div className="section-img">
                <img src={photo12} alt="main cover" loading="eager" />
            </div>
        </div>
    );
}

export default Hero;

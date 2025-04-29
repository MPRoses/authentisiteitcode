import React, { useEffect } from 'react';
import $ from 'jquery';
import './../css/Hero.css';

function Hero() {
    return (
        <div className="section">
            <div className="section-wrapper">
                <div className="section-title">
                    Rust en richting bij autisme<br />
                    en prikkelverwerking
                </div>
                <div className="section-bio">
                    Ik ben Jorit Doeswijk, orthopedagoog gespecialiseerd in autisme en sensorische informatieverwerking.
                    Vanuit de overtuiging dat ieder mens uniek is, bied ik ondersteuning op maat – met kennis,
                    betrokkenheid en oog voor ieders eigenheid.
                </div>
                <div className="hero-cta-container">
                    <div className="hero-cta clickable">
                        Meer over mij
                    </div>
                    <div className="hero-cta clickable">
                        Hoe ik help
                    </div>
                </div>
            </div>
            <div className="section-img">
                <img src="" alt="main cover"/>
            </div>
        </div>
    );
}

export default Hero;
import React, { useEffect } from 'react';
import $ from 'jquery';
import './../css/Hero.css';

function Hero() {
    useEffect(() => {
        // Scroll helper
        function scrollToSection(selector, offsetMultiplier = 0.15) {
            const target = $(selector);
            if (target.length) {
                const offset = target.offset().top - ($(window).height() * offsetMultiplier);
                $('html, body').animate({ scrollTop: offset }, 600);
            }
        }

        // CTA: Meer over mij
        $('.hero-cta:contains("Meer over mij")').on('click', function () {
            scrollToSection('.about-me', 0.15);
        });

        // CTA: Hoe ik help
        $('.hero-cta:contains("Hoe ik help")').on('click', function () {
            scrollToSection('.helpgebieden', 0.11);
        });

        return () => {
            $('.hero-cta:contains("Meer over mij")').off('click');
            $('.hero-cta:contains("Hoe ik help")').off('click');
        };
    }, []);

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
                <img src="" alt="main cover" />
            </div>
        </div>
    );
}

export default Hero;
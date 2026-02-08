import React, {useEffect} from 'react';
import './../css/Hero.css';
import $ from 'jquery';
import photo12 from './../img/photo12.webp';

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
            scrollToSection('.scrollaboutmehere', 0.15);
        });

        // CTA: Hoe ik help
        $('.hero-cta:contains("Hoe ik help")').on('click', function () {
            scrollToSection('.helpgebieden', 0.03);
        });

        return () => {
            $('.hero-cta:contains("Meer over mij")').off('click');
            $('.hero-cta:contains("Hoe ik help")').off('click');
        };
    }, []);

    return (
        <div className="section">
            <div className="section-wrapper fade-in">
                <div className="section-title ">
                    Rust en richting bij autisme<br />
                    en prikkelverwerking
                </div>
                <div className="section-bio">
                    Ik ben Jorit Doeswijk, NVO geregistreerd Orthopedagoog, met als specialisme Sensorische Informatieverwerking (zintuiglijke informatieverwerking), autisme en verstandelijke beperking.
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
            <div className="section-img fade-in">
                <img src={photo12} alt="main cover" loading="eager"/>
            </div>
        </div>
    );
}

export default Hero;
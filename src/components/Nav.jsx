import React, { useEffect } from 'react';
import $ from 'jquery';
import './../css/Nav.css';
import logo from './../img/logo.svg';
import dropdown from './../img/dropdown.svg';

function Nav() {
    useEffect(() => {
        let lastScrollTop = 0;

        $(window).on('scroll', function () {
            const currentScroll = $(this).scrollTop();

            if (currentScroll > lastScrollTop) {
                $('.nav').addClass('nav-semi');
            } else {
                if (currentScroll < window.innerHeight * 0.75) {
                    $('.nav').removeClass('nav-semi');
                }
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Scroll helper with custom offset
        function scrollToSection(selector, offsetMultiplier = 0.15) {
            const target = $(selector);
            if (target.length) {
                const offset = target.offset().top - ($(window).height() * offsetMultiplier);
                $('html, body').animate({ scrollTop: offset }, 600);
            }
        }

        // "Over mij" scroll to .about-me with -0.15 offset
        $('.nav-item:contains("Over mij") .clickable').on('click', function () {
            scrollToSection('.about-me', 0.15);
        });

        // "Hoe ik help" scroll to .helpgebieden with -0.12 offset
        $('.nav-item:contains("Hoe ik help") > .clickable').on('click', function () {
            scrollToSection('.helpgebieden', 0.11);
        });

        // "Helpgebieden" submenu scroll to .helpgebieden with -0.12 offset
        $('.dropdown-item:contains("Helpgebieden")').on('click', function () {
            scrollToSection('.helpgebieden', 0.11);
        });

        return () => {
            $(window).off('scroll');
            $('.nav-item:contains("Over mij") .clickable').off('click');
            $('.nav-item:contains("Hoe ik help") > .clickable').off('click');
            $('.dropdown-item:contains("Helpgebieden")').off('click');
        };
    }, []);

    return (
        <div className="nav">
            <div className="nav-logo clickable">
                <img src={logo} alt="site logo with text" />
            </div>
            <div className="nav-wrapper">
                <div className="nav-item">
                    <span className="clickable">
                        Over mij
                    </span>
                </div>
                <div className="nav-item">
                    <span className="clickable">
                        Hoe ik help
                        <img src={dropdown} alt="downwards arrow" />
                    </span>
                    <div className="nav-dropdown">
                        <div className="dropdown-item clickable">
                            Helpgebieden
                        </div>
                        <div className="dropdown-item clickable">
                            Ondersteuningsvormen
                        </div>
                        <div className="dropdown-item clickable">
                            Werkwijze
                        </div>
                    </div>
                </div>
                <div className="nav-item clickable">
                    Contact
                </div>
            </div>
        </div>
    );
}

export default Nav;
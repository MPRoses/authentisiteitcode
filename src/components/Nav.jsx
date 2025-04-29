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
                // Scrolling down
                $('.nav').addClass('nav-semi');
            } else {
                // Scrolling up
                $('.nav').removeClass('nav-semi');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
        });

        return () => {
            // Clean up on unmount
            $(window).off('scroll');
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

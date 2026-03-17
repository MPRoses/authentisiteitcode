import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import './../css/Nav.css';
import logo from './../img/logo.svg';

function Nav() {
    const [isActive, setIsActive] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let lastScrollTop = 0;

        $(window).on('scroll', function () {
            const currentScroll = $(this).scrollTop();

            if (currentScroll > lastScrollTop) {
                $('.nav').addClass('nav-semi');
            } else if (currentScroll < window.innerHeight * 0.75) {
                $('.nav').removeClass('nav-semi');
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        return () => {
            $(window).off('scroll');
        };
    }, []);

    const closeMenu = () => {
        setIsActive(false);
        $('body').removeClass('isInactive');
    };

    const handleLogoClick = () => {
        closeMenu();
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'auto' });
            window.dispatchEvent(new Event('refresh-fade-in'));
            return;
        }
        navigate('/');
    };

    const handleRouteClick = (targetPath) => (event) => {
        closeMenu();

        if (pathname !== targetPath) {
            return;
        }

        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'auto' });
        window.dispatchEvent(new Event('refresh-fade-in'));
    };

    const handleBurgerClick = () => {
        if ($('body').hasClass('isInactive')) {
            $('body').removeClass('isInactive');
        } else {
            $('body').addClass('isInactive');
        }
        setIsActive((prevState) => !prevState);
    };

    const handleContactClick = () => {
        closeMenu();
        const scrollToBottom = () => {
            const scrollingElement = document.scrollingElement || document.documentElement;
            const root = document.getElementById('root');
            const contentContainer = document.querySelector('.content-container');
            const maxScroll = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight,
                scrollingElement ? scrollingElement.scrollHeight : 0,
                root ? root.scrollHeight : 0,
                contentContainer ? contentContainer.scrollHeight : 0
            );

            window.scrollTo({ top: maxScroll, behavior: 'smooth' });
            if (scrollingElement) {
                scrollingElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
            }
            if (root) {
                root.scrollTo({ top: maxScroll, behavior: 'smooth' });
            }
            if (contentContainer) {
                contentContainer.scrollTo({ top: maxScroll, behavior: 'smooth' });
            }
        };

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(scrollToBottom);
        });
    };

    return (
        <div className="nav">
            <div className="nav-logo fade-in clickable" onClick={handleLogoClick}>
                <img src={logo} alt="site logo with text" />
            </div>
            <div className="nav-wrapper fade-in">
                <div className="nav-item">
                    <NavLink
                        className={({ isActive }) => `clickable${isActive ? ' active' : ''}`}
                        to="/overmij"
                        onClick={handleRouteClick('/overmij')}
                    >
                        Over mij
                    </NavLink>
                </div>
                <div className="nav-item">
                    <NavLink
                        className={({ isActive }) => `clickable${isActive ? ' active' : ''}`}
                        to="/hoeikhelp"
                        onClick={handleRouteClick('/hoeikhelp')}
                    >
                        Hoe ik help
                    </NavLink>
                </div>
                <div className="nav-item">
                    <NavLink
                        className={({ isActive }) => `clickable${isActive ? ' active' : ''}`}
                        to="/blog"
                        onClick={handleRouteClick('/blog')}
                    >
                        Blog
                    </NavLink>
                </div>
                <div className="nav-item clickable" onClick={handleContactClick}>
                    <span className="clickable">
                        Contact
                    </span>
                </div>
            </div>
            <div className={`burger clickable ${isActive ? 'active' : ''}`} onClick={handleBurgerClick}>
                <div className="icn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`menu ${isActive ? 'active' : ''}`}>
                <div className="items-container">
                    <div className="menu-item clickable">
                        <NavLink
                            className={({ isActive }) => `clickable${isActive ? ' active' : ''}`}
                            to="/overmij"
                            onClick={handleRouteClick('/overmij')}
                        >
                            Over mij
                        </NavLink>
                    </div>
                    <div className="menu-item clickable">
                        <NavLink
                            className={({ isActive }) => `clickable${isActive ? ' active' : ''}`}
                            to="/hoeikhelp"
                            onClick={handleRouteClick('/hoeikhelp')}
                        >
                            Hoe ik help
                        </NavLink>
                    </div>
                    <div className="menu-item clickable">
                        <NavLink
                            className={({ isActive }) => `clickable${isActive ? ' active' : ''}`}
                            to="/blog"
                            onClick={handleRouteClick('/blog')}
                        >
                            Blog
                        </NavLink>
                    </div>
                    <div className="menu-item clickable" onClick={handleContactClick}>
                        Contact
                    </div>
                </div>
                <div className="menu-bg"></div>
            </div>
        </div>
    );
}

export default Nav;

import "./App.css";
import "./fonts.css";
import { useEffect, useState } from "react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Helpgebieden from "./components/Helpgebieden";
import Ondersteuningsvormen from "./components/Ondersteuningsvormen";
import Werkwijze from "./components/Werkwijze";
import FAQ from "./components/FAQ";
import Preloader from "./components/Preloader";
import AboutMeMobile from "./components/AboutMeMobile";

function App() {
    const [containerStyle, setContainerStyle] = useState({});
    const [preloaderActive, setPreloaderActive] = useState(true);
    const [spacerHeight, setSpacerHeight] = useState(0);

    // existing preloader effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloaderActive(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // existing resize & spacer effect
    useEffect(() => {
        const handleResize = () => {
            const innerWidth = window.innerWidth;
            if (innerWidth > 1920) {
                const delta = innerWidth - 1920;
                const margin = delta / 2;
                setContainerStyle({
                    width: 1920,
                    marginLeft: margin,
                    marginRight: margin,
                });
            } else {
                setContainerStyle({
                    width: innerWidth,
                    marginLeft: 0,
                    marginRight: 0,
                });
            }

            const contact = document.querySelector('.contact');
            if (contact) {
                const bottom = contact.offsetTop + contact.offsetHeight;
                setSpacerHeight(bottom);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // existing fade-in effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                    } else {
                        entry.target.style.opacity = "0";
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const fadeElements = document.querySelectorAll(".fade-in");
        fadeElements.forEach((el) => {
            el.style.transition = "opacity 0.6s ease-out";
            el.style.opacity = "0";
            observer.observe(el);
        });

        return () => {
            fadeElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    // new: preload all images immediately
    useEffect(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        imgs.forEach((img) => {
            // if you're using data-src for lazy-loading, use that; otherwise use src
            const src = (img.getAttribute("data-src") || img.src || "").trim();
            if (!src) return;

            // kick off download/cache
            const preloader = new Image();
            preloader.src = src;

            // ensure eager loading even if lazy was set
            img.setAttribute("loading", "eager");
        });
    }, []);

    return (
        <>
            <div className="content-container" style={containerStyle}>
                <div className={`preloader ${preloaderActive ? 'active' : ''}`}>
                    <Preloader />
                </div>
                <Nav />
                <Hero />
                <AboutMeMobile />
                <AboutMe />
                <Helpgebieden />
                <Ondersteuningsvormen />
                <Werkwijze />
                <FAQ />
            </div>
            <div style={{ height: `${spacerHeight}px`, width: '100%' }}></div>
        </>
    );
}

export default App;
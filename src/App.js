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

function App() {
    const [containerStyle, setContainerStyle] = useState({});
    const [preloaderActive, setPreloaderActive] = useState(true);
    const [spacerHeight, setSpacerHeight] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloaderActive(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

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

    return (
        <>
            <div className="content-container" style={containerStyle}>
                <div className={`preloader ${preloaderActive ? 'active' : ''}`}>
                    <Preloader />
                </div>
                <Nav />
                <Hero />
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
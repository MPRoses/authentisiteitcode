import "./App.sass";
import "./fonts.css";
import { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import AboutMeMobile from "./components/AboutMeMobile";
import Preloader from "./components/Preloader";
import HelpGebieden from "./components/Helpgebieden";
import Ondersteuningsvormen from "./components/Ondersteuningsvormen";
import Werkwijze from "./components/Werkwijze";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import BlogCarousel from "./components/BlogCarousel";
import Admin from "./components/Admin";
import { preloadImages } from "./utils/preloadImages";

import photo2 from "./img/photo2.webp";
import photo3 from "./img/photo3.webp";
import photo4 from "./img/photo4.webp";
import photo8 from "./img/photo8.webp";
import photo9 from "./img/photo9.webp";
import photo10 from "./img/photo10.webp";

function ScrollToTopOnRouteChange() {
    const { pathname, hash, state } = useLocation();

    useEffect(() => {
        if (state?.scrollToId) {
            window.setTimeout(() => {
                const element = document.getElementById(state.scrollToId);

                if (element) {
                    const targetTop = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "auto" });
                    return;
                } else {
                    window.scrollTo(0, 0);
                }

            }, 0);
            return;
        }

        if (hash) {
            window.setTimeout(() => {
                const targetId = hash.replace("#", "");
                const element = document.getElementById(targetId);

                if (element) {
                    const targetTop = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "auto" });
                    return;
                }

                window.scrollTo(0, 0);
            }, 0);
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname, hash, state]);

    return null;
}

function App() {
    const { pathname, hash } = useLocation();
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
    const [isPreloaderActive, setIsPreloaderActive] = useState(true);
    const [isMobileAboutMe, setIsMobileAboutMe] = useState(() => window.innerWidth <= 1150);
    const [fadeRefreshTick, setFadeRefreshTick] = useState(0);

    useEffect(() => {
        const deactivateTimeoutId = window.setTimeout(() => {
            setIsPreloaderActive(false);
        }, 1200);

        const hideTimeoutId = window.setTimeout(() => {
            setIsPreloaderVisible(false);
        }, 1800);

        return () => {
            window.clearTimeout(deactivateTimeoutId);
            window.clearTimeout(hideTimeoutId);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileAboutMe(window.innerWidth <= 1150);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        preloadImages([photo2, photo3, photo4, photo8, photo9, photo10]);
    }, []);

    useEffect(() => {
        const handleFadeRefresh = () => {
            setFadeRefreshTick((currentValue) => currentValue + 1);
        };

        window.addEventListener("refresh-fade-in", handleFadeRefresh);

        return () => {
            window.removeEventListener("refresh-fade-in", handleFadeRefresh);
        };
    }, []);

    useEffect(() => {
        const fadeElements = Array.from(document.querySelectorAll(".fade-in"));

        fadeElements.forEach((element) => {
            element.classList.remove("active");
        });

        if (isPreloaderVisible || fadeElements.length === 0) {
            return undefined;
        }

        const isElementInView = (element) => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const triggerTop = viewportHeight * 0.88;
            const triggerBottom = viewportHeight * 0.08;

            return rect.top <= triggerTop && rect.bottom >= triggerBottom;
        };

        const syncVisibleState = () => {
            fadeElements.forEach((element) => {
                element.classList.toggle("active", isElementInView(element));
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("active", entry.isIntersecting);
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -12% 0px",
            }
        );

        const activateVisibleElements = window.requestAnimationFrame(() => {
            syncVisibleState();
            fadeElements.forEach((element) => observer.observe(element));
        });

        return () => {
            window.cancelAnimationFrame(activateVisibleElements);
            observer.disconnect();
        };
    }, [isPreloaderVisible, pathname, hash, isMobileAboutMe, fadeRefreshTick]);

    const HomePage = () => (
        <>
            <Hero />
            {isMobileAboutMe ? <AboutMeMobile preview /> : <AboutMe preview />}
            <HelpGebieden />
            <div className="home-hoeikhelp-cta fade-in">
                <Link className="home-hoeikhelp-link clickable" to="/hoeikhelp#ondersteuningsvormen">
                    Bekijk hoe ik kan helpen
                </Link>
            </div>
            <BlogCarousel />
            <FAQ />
        </>
    );

    const HoeIkHelpPage = () => (
        <>
            <HelpGebieden />
            <Ondersteuningsvormen />
            <Werkwijze />
            <FAQ />
        </>
    );

    const OverMijPage = () => (
        <>
            {isMobileAboutMe ? <AboutMeMobile /> : <AboutMe />}
            <FAQ />
        </>
    );

    const BlogPage = () => (
        <>
            <Blog key={pathname} />
            <FAQ />
        </>
    );

    const BlogPostPage = () => (
        <>
            <BlogPost key={pathname} />
            <FAQ />
        </>
    );

    return (
        <>
            {isPreloaderVisible && <Preloader isActive={isPreloaderActive} />}
            <ScrollToTopOnRouteChange />
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/overmij" element={<OverMijPage />} />
                <Route path="/hoeikhelp" element={<HoeIkHelpPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    );
}

export default App;

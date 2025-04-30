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

function App() {
    const [containerStyle, setContainerStyle] = useState({});

    useEffect(() => {
        const handleResize = () => {
            const innerWidth = window.innerWidth;

            if (innerWidth > 1920) {
                const delta = innerWidth - 1920;
                const margin = delta / 2;
                setContainerStyle({
                    width: 1920, // Keep the width fixed at 1920px
                    marginLeft: margin,
                    marginRight: margin,
                });
            } else {
                setContainerStyle({
                    width: innerWidth, // Use the full window width when it's less than 1920px
                    marginLeft: 0,
                    marginRight: 0,
                });
            }
        };

        // Initial resize
        handleResize();

        // Add event listener on window resize
        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="content-container" style={containerStyle}>
            <Nav/>
            <Hero/>
            <AboutMe/>
            <Helpgebieden/>
            <Ondersteuningsvormen/>
            <Werkwijze/>
            <FAQ/>
        </div>
    );
}

export default App;
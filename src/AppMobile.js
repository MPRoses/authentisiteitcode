import "./App.css";
import "./fonts.css";
import React, { useEffect, useState } from "react";
import './Mobile.css';
import $ from 'jquery';
import photo12 from './img/photo12.webp';
import photo4 from './img/photo4.webp';
import photo10 from './img/photo10.webp';
import photo9 from './img/photo9.webp';
import img1 from './img/img1.webp';
import img2 from './img/img2.webp';
import img3 from './img/img3.webp';
import werkwijze from './img/werkwijze.webp';
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import Helpgebieden from "./components/Helpgebieden";
import FAQ from "./components/FAQ";

function AppMobile() {
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
        $(window).scroll(() => {
            console.log($(window).scrollTop());
        })
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
                <div className="mobile-container">
                    <div className="title1 item fade-in">
                        Rust en richting bij autisme
                        en prikkelverwerking
                    </div>
                    <div className="bio1 item fade-in">
                        Ik ben Jorit Doeswijk, NVO geregistreerd Orthopedagoog, met als specialisme Sensorische Informatieverwerking (zintuiglijke informatieverwerking), autisme en verstandelijke beperking.
                    </div>
                    <div className="img item fade-in">
                        <img src={photo12} alt="headshot"/>
                    </div>
                    <div className="spacer init"></div>
                    <div className="title1 item fade-in scrollaboutmehere">
                        Over mij
                    </div>
                    <div className="bio1 item fade-in">
                        In mijn werk als zorgprofessional heb ik een brede ontwikkeling ondergaan. Ik ben begonnen op een woongroep bij Stichting Epilepsie Instellingen Nederland (SEIN). Daar heb ik gewerkt met volwassen met een verstandelijke beperking, moeilijk verstaanbaar gedrag en epilepsie. De mensen die daar wonen hebben naast een verstandelijke beperking ook vaak de diagnose Autisme Spectrum Stoornis.
                    </div>
                    <div className="img item fade-in">
                        <img src={photo9} alt="extra context"/>
                    </div>
                    <div className="bio1 item fade-in">
                        Na mijn tijd bij SEIN heb ik gewerkt in de kliniek intensieve zorg van Rivierduinen in Oegstgeest. Ook heb ik gewerkt voor het jeugd en gezinsteam Leiden namens stichting MEE Zuid Holland Noord en ben ik begeleider geweest bij Ons Tweede Thuis. Tijdens mijn werk als begeleider bij de diverse instellingen heb ik mij altijd zeer geïnteresseerd in de vraag waar gedrag vandaan komt, waar ik dagelijks mee te maken kreeg. Ik vind het belangrijk dat ik kan zorgen dat iemand zo fijn mogelijk de dag doorkomt.
                    </div>
                    <div className="img item fade-in">
                        <img src={photo4} alt="extra context"/>
                    </div>
                    <div className="bio1 item fade-in">
                        In mijn werk als orthopedagoog is mij opgevallen dat de mensen met wie ik werk zeer veel moeite hebben met het leven in een groep. Zij krijgen de gehele dag veel prikkels vanuit de omgeving. Van mensen met een Autisme Spectrum Stoornis is bekend dat zij vaak problemen ervaren in het verwerken van de vele prikkels die zij op een dag ervaren. Om meer kennis te krijgen over hoe zij hiermee om kunnen gaan, heb ik mij gespecialiseerd in Sensorische Informatie Verwerking (SI) en autisme. Dit heeft mij geholpen om deze problemen beter te begrijpen bij kinderen en volwassenen met autisme met en zonder een ontwikkelingsachterstand/ verstandelijke beperking.
                        <br></br><br></br>
                        Regelmatig kom ik gedrag tegen waarvan niet duidelijk is wat de oorzaak van dit gedrag is. Dit kan ervoor zorgen dat aansluiting bij de kern van de problemen niet altijd goed lukt. Daarnaast is er regelmatig onvoldoende aandacht voor uitleg wat de resultaten van de diagnostiek betekent voor iedereen die ondersteuning moet bieden. Door goede uitleg te geven wat een diagnose betekent helpt dit voor passende ondersteuning. Hierbij is het doel dat iedereen begrijpt wat een diagnose op papier nu werkelijk betekent in de praktijk. Ik wil daarbij vroegtijdig mensen met autisme en de omgeving ondersteunen in het zoeken naar passende manieren om met autisme en/of prikkelverwerking problemen om te leren gaan.
                    </div>
                    <div className="img item fade-in">
                        <img src={photo10} alt="extra context"/>
                    </div>
                    <div className="bio1 item fade-in">
                        Vanuit het idee dat ieder mens uniek en daardoor Authentiek is en mag zijn, bied ik mijn diensten aan ter ondersteuning en kennisverspreiding. Ik richt mij daarin op de vraag hoe het is om met deze problemen om te gaan als persoon.
                        <br></br><br></br>
                        Mijn hulp richt zich op de mens met autisme en/of prikkelverwerkingsproblemen, maar ook op de omgeving waarin iemand zich staande moet houden. De ondersteuning die ik bied richt zich diagnostiek, persoonlijke ondersteuning en op het geven van uitleg aan de persoon met autisme familie, scholen, BSO/kinderdagverblijf, sportverenigingen en collega’s.
                    </div>
                    <div className="spacer"></div>
                    <div className="title1 item fade-in">
                        Ik kijk graag naar wat wél werkt
                    </div>
                    <div className="bio1 item fade-in">
                        Iedere persoon met autisme of een verstandelijke beperking is uniek. Ik help u inzicht krijgen
                        in gedrag, prikkelverwerking en ondersteuningsbehoeften – zodat u, uw kind of cliënt meer rust
                        en balans kan ervaren in het dagelijks leven.
                    </div>

                    <Helpgebieden/>
                    <div className="spacer big"></div>
                    <div className="title1 item fade-in">
                        Hulp en begeleiding afgestemd op uw vraag
                    </div>
                    <div className="bio1 item fade-in">
                        Als specialist in autisme en sensorische verwerking bied ik zowel psycho-educatie, scholing als
                        persoonlijke ondersteuning aan. Of u nu op zoek bent naar praktische informatie voor uzelf, uw
                        organisatie, of uw kind, ik help u verder met op maat gemaakte oplossingen die aansluiten bij uw
                        specifieke situatie.
                    </div>
                    <div className="title2 item fade-in">
                        Psycho-educatie & scholing
                    </div>
                    <div className="bio1 item fade-in">
                        Heeft u als organisatie, of als ouder/begeleider behoefte aan meer uitleg over de problemen waar
                        u in de dagelijkse praktijk tegenaan loopt, vult u dan uw vraag en uw gegevens in bij het
                        contact formulier. Ik neem dan contact met u op vrijblijvend de mogelijkheden die ik u kan
                        bieden door te nemen.
                        <br></br><br></br>
                        Het scholingsaanbod kan op maat gemaakt worden naar doelgroep en problematiek en persoonlijke
                        behoefte.
                        <br></br><br></br>
                        Ik bied interactieve workshops aan, maar ook meer educatie gericht op de onderliggende theorieën
                        van ontwikkeling, Autisme en Sensorische Informatieverwerking.
                        <br></br><br></br>
                        Een combinatie van theorie en ervaringsleren is ook mogelijk. Ik pas mij graag aan naar de
                        behoefte van u als persoon of organisatie om het maximale uit een training te kunnen halen.
                    </div>
                    <div className="img item fade-in">
                        <img src={img1} alt="extra context"/>
                    </div>

                    <div className="title2 item fade-in">
                        Persoonlijke ondersteuning
                    </div>
                    <div className="bio1 item fade-in">
                        Ontdekken dat u of uw kind autisme heeft, brengt vaak veel vragen met zich mee. Ik help u bij
                        het vinden van houvast in een maatschappij die nog niet altijd even autismevriendelijk is.
                        <br></br><br></br>
                        We onderzoeken samen welke aanpassingen helpend zijn en hoe u grip kunt krijgen op situaties die
                        moeilijk verlopen — thuis, op school of in de vrije tijd.
                    </div>
                    <div className="img item fade-in">
                        <img src={img2} alt="extra context"/>
                    </div>

                    <div className="title2 item fade-in">
                        Ondersteuningsprofielen & diagnostiek
                    </div>
                    <div className="bio1 item fade-in">
                        Indien u een vermoeden heeft dat u of uw kind zich anders ontwikkelt kan ik met u kijken naar de
                        mogelijkheden voor diagnostiek. Aan welke ondersteuningsbehoefte kan ik voldoen door het doen
                        van diagnostiek.
                        <br></br><br></br>
                        Ik kan daarbij ondersteunen door het opstellen van een sensorisch profiel, Autisme onderzoek of
                        intelligentie onderzoek. Vanuit dit stukje diagnostiek kan ik verder in kaart brengen aan welke
                        ondersteuningsbehoefte op het gebied van Autisme, verstoorde prikkelverwerking of mogelijke
                        verstandelijke beperking ik kan voldoen.
                    </div>
                    <div className="img item fade-in">
                        <img src={img3} alt="extra context"/>
                    </div>

                    <div className="spacer big"></div>
                    <div className="title1 item fade-in">
                        Werkwijze
                    </div>
                    <div className="bio1 item fade-in">
                        Ieder traject begint met goed luisteren. In een eerste gesprek verkennen we samen wat er speelt,
                        waar de behoeften liggen, en wat u hoopt te bereiken. Mijn aanpak is persoonlijk, flexibel en
                        afgestemd op uw situatie, of het nu gaat om een kind, volwassene, gezin of organisatie.
                    </div>
                    <div className="img item fade-in">
                        <img src={werkwijze} alt="extra context"/>
                    </div>

                    <div className="title2 item fade-in">
                        Kennismaking & intake
                    </div>
                    <div className="bio1 item fade-in">
                        Tijdens een laagdrempelig gesprek maken we kennis en brengen we samen in kaart welke vragen of
                        zorgen er zijn. Dit kan bij u thuis, op locatie of online.

                    </div>

                    <div className="title2 item fade-in">
                        Afstemming op maat
                    </div>
                    <div className="bio1 item fade-in">
                        Geen standaardtrajecten, maar een unieke aanpak die past. Ik kijk naar de context, de hulpvraag
                        en de mogelijkheden. Of het nu gaat om een eenmalig consult, langdurige begeleiding, of een
                        scholingstraject.

                    </div>

                    <div className="title2 item fade-in">
                        Samenwerking & communicatie
                    </div>
                    <div className="bio1 item fade-in">
                        Heldere afspraken, korte lijntjes en regelmatig afstemmen. Ik werk graag samen met ouders,
                        begeleiders, leerkrachten en andere betrokkenen om de ondersteuning zo krachtig mogelijk te
                        maken.
                    </div>
                    <div className="spacer big"></div>
                    <FAQ/>
                </div>


            </div>
            <div style={{height: `${spacerHeight}px`, width: '100%'}}></div>
        </>
    );
}

export default AppMobile;
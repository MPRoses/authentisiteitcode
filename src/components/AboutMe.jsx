import React, { useEffect } from 'react';
import './../css/Hero.css';
import './../css/AboutMe.css';

import $ from 'jquery';

import photo2 from './../img/photo2.webp';
import photo3 from './../img/photo3.webp';
import photo4 from './../img/photo4.webp';
import photo8 from './../img/photo8.webp';
import photo9 from './../img/photo9.webp';
import photo10 from './../img/photo10.webp';

function AboutMe() {
    useEffect(() => {
        // Decode all images early to prevent scroll jank
        const imageSources = [photo2, photo3, photo4, photo8, photo9, photo10];

        imageSources.forEach((src) => {
            const img = new Image();
            img.src = src;
            if (img.decode) {
                img.decode().catch(() => {}); // decode asynchronously
            }
        });

        $(".read-more").on("click", function () {
            $(".about-me-mobile").css({
                "display": "block",
                "opacity": "1"
            });
            $("body, #root").css("overflow-y", "hidden");
        });

    }, []);

    return (
        <div className="about-me scrollaboutmehere section">
            <div className="section-wrapper about-me-wrapper">

                <h2 className="section-title about-me-title fade-in">
                    Over mij
                </h2>

                <div className="section-bio fade-in">
                    <p>
                        In mijn werk als zorgprofessional heb ik een brede ontwikkeling ondergaan. Ik ben begonnen op een woongroep bij Stichting Epilepsie Instellingen Nederland (SEIN). Daar heb ik gewerkt met volwassen met een verstandelijke beperking, moeilijk verstaanbaar gedrag en epilepsie. De mensen die daar wonen hebben naast een verstandelijke beperking ook vaak de diagnose Autisme Spectrum Stoornis.
                    </p>

                    <p>
                        Na mijn tijd bij SEIN heb ik gewerkt in de kliniek intensieve zorg van Rivierduinen in Oegstgeest. Ook heb ik gewerkt voor het jeugd en gezinsteam Leiden namens stichting MEE Zuid Holland Noord en ben ik begeleider geweest bij Ons Tweede Thuis. Tijdens mijn werk als begeleider bij de diverse instellingen heb ik mij altijd zeer geïnteresseerd in de vraag waar gedrag vandaan komt, waar ik dagelijks mee te maken kreeg. Ik vind het belangrijk dat ik kan zorgen dat iemand zo fijn mogelijk de dag doorkomt.
                    </p>
                    <p className="read-more">
                        Na mijn tijd bij SEIN heb ik .....
                        <div className="read-more-btn btn clickable">
                            Lees Meer
                        </div>
                    </p>

                    <p className="full-bio">
                        In mijn werk als orthopedagoog is mij opgevallen dat de mensen met wie ik werk zeer veel moeite hebben met het leven in een groep. Zij krijgen de gehele dag veel prikkels vanuit de omgeving. Van mensen met een Autisme Spectrum Stoornis is bekend dat zij vaak problemen ervaren in het verwerken van de vele prikkels die zij op een dag ervaren. Om meer kennis te krijgen over hoe zij hiermee om kunnen gaan, heb ik mij gespecialiseerd in Sensorische Informatie Verwerking (SI) en autisme. Dit heeft mij geholpen om deze problemen beter te begrijpen bij kinderen en volwassenen met autisme met en zonder een ontwikkelingsachterstand/ verstandelijke beperking.
                    </p>

                    <p className="full-bio">
                        Regelmatig kom ik gedrag tegen waarvan niet duidelijk is wat de oorzaak van dit gedrag is. Dit kan ervoor zorgen dat aansluiting bij de kern van de problemen niet altijd goed lukt. Daarnaast is er regelmatig onvoldoende aandacht voor uitleg wat de resultaten van de diagnostiek betekent voor iedereen die ondersteuning moet bieden. Door goede uitleg te geven wat een diagnose betekent helpt dit voor passende ondersteuning. Hierbij is het doel dat iedereen begrijpt wat een diagnose op papier nu werkelijk betekent in de praktijk. Ik wil daarbij vroegtijdig mensen met autisme en de omgeving ondersteunen in het zoeken naar passende manieren om met autisme en/of prikkelverwerking problemen om te leren gaan.
                    </p>

                    <p className="full-bio">
                        Vanuit het idee dat ieder mens uniek en daardoor Authentiek is en mag zijn, bied ik mijn diensten aan ter ondersteuning en kennisverspreiding. Ik richt mij daarin op de vraag hoe het is om met deze problemen om te gaan als persoon.
                    </p>

                    <p className="full-bio">
                        Mijn hulp richt zich op de mens met autisme en/of prikkelverwerkingsproblemen, maar ook op de omgeving waarin iemand zich staande moet houden. De ondersteuning die ik bied richt zich diagnostiek, persoonlijke ondersteuning en op het geven van uitleg aan de persoon met autisme familie, scholen, BSO/kinderdagverblijf, sportverenigingen en collega’s.
                    </p>
                </div>
            </div>

            <div className="section-img img-class-3 img-top-right about-me-img fade-in">
                <img src={photo2} alt="main cover" loading="eager" />
            </div>
            <div className="section-img img-class-2 img-middle-right about-me-img fade-in">
                <img src={photo3} alt="main cover" loading="eager" />
            </div>
            <div className="section-img img-class-1 img-bottom-right about-me-img fade-in">
                <img src={photo9} alt="main cover" loading="eager" />
            </div>
            <div className="section-img img-class-3 img-bottom-left about-me-img fade-in">
                <img src={photo4} alt="main cover" loading="eager" />
            </div>
            <div className="section-img img-class-2 img-middle-left about-me-img fade-in">
                <img src={photo10} alt="main cover" loading="eager" />
            </div>
            <div className="section-img img-class-1 img-top-left about-me-img fade-in">
                <img src={photo8} alt="main cover" loading="eager" />
            </div>
        </div>
    );
}

export default AboutMe;
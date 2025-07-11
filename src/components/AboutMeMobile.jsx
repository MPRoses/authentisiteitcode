import React from 'react';
import './../css/Hero.css';
import './../css/AboutMe.css';

import $ from 'jquery';

import photo3 from './../img/photo3.webp';
import photo4 from './../img/photo4.webp';
import photo9 from './../img/photo9.webp';
import photo10 from './../img/photo10.webp';

function AboutMe() {

    return (
        <div className="about-me-mobile about-me">
            <div className="about-close clickable" onClick={() => {
                $(".about-me-mobile").css({opacity: "0"});
                $("body, #root").css("overflow-y", "auto");
                setTimeout(() => {
                    $(".about-me-mobile").css({display: "none"});
                }, 1500);
            }}>
                <div className="icn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>


            <div className="section-wrapper about-me-wrapper">

                <h2 className="section-title about-me-title fade-in">
                    Over mij
                </h2>

                <div className="section-bio">
                    <p className="fade-in">
                        Hey! Ik ben Jorit, getrouwd en vader van 2 dochters. Ik heb lange tijd met veel plezier op het
                        voetbalveld gestaan als trainer van de jeugd van FC Lisse. Daarin stond plezier voor iedereen
                        voorop. Daarbij is persoonlijke ontwikkeling op ieders eigen manier en niveau zeer belangrijk.
                        Om
                        persoonlijk tot rust te komen stap ik graag op de fiets om lange tochten te maken.
                    </p>

                    <div className="section-img img-class-3 about-img-mobile-1 fade-in">
                        <img src={photo9} alt="main cover"/>
                    </div>

                    <p className="fade-in">
                        In mijn werk als zorgprofessional ben ik begonnen op een woongroep bij Stichting Epilepsie
                        Instellingen Nederland (SEIN). Daar heb ik gewerkt met volwassen met een verstandelijke
                        beperking,
                        moeilijk verstaanbaar gedrag en epilepsie. De mensen die daar wonen hebben naast een
                        verstandelijke
                        beperking ook vaak de diagnose Autisme Spectrum Stoornis.
                    </p>

                    <p className="fade-in">
                        Na mijn tijd bij SEIN heb ik gewerkt in de kliniek intensieve zorg van Rivierduinen in
                        Oegstgeest.
                        Ook heb ik gewerkt voor het jeugd en gezinsteam Leiden namens stichting MEE Zuid Holland Noord
                        en
                        ben ik begeleider geweest bij Ons Tweede Thuis.
                    </p>

                    <div className="section-img img-class-3 about-img-mobile-1 fade-in">
                        <img src={photo3} alt="main cover"/>
                    </div>

                    <p className="fade-in">
                        Tijdens mijn werk als begeleider bij de diverse instellingen heb ik mij altijd zeer
                        geïnteresseerd
                        in de vraag waar gedrag vandaan komt, waar ik dagelijks mee te maken kreeg. Ik vind het
                        belangrijk
                        dat ik kan zorgen dat iemand zo fijn mogelijk de dag doorkomt. Vanuit deze gedachten heb ik
                        besloten om na mijn studie Social Work aan de Hogeschool INHolland (Haarlem) door te studeren
                        als
                        Orthopedagoog aan de VU in Amsterdam. Na deze studie ben ik als Orthopedagoog verbonden aan
                        meerdere
                        woningen voor mensen met een verstandelijke beperking. Daarin ondersteun ik de mensen met een
                        verstandelijke beperking en het netwerk eromheen en de begeleiders.
                    </p>

                    <p className="fade-in">
                        In mijn werk als orthopedagoog is mij opgevallen dat de mensen met wie ik werk zeer veel moeite
                        hebben met het leven in een groep. Zij krijgen de gehele dag veel prikkels vanuit de omgeving.
                        Van
                        mensen met een Autisme Spectrum Stoornis is bekend dat zij vaak problemen ervaren in het
                        verwerken
                        van de vele prikkels die zij op een dag ervaren. Om meer kennis te krijgen over hoe zij hiermee
                        om
                        kunnen gaan, heb ik mij gespecialiseerd in Sensorische Informatie Verwerking (SI) en Autisme.
                        Dit
                        heeft mij geholpen om deze problemen beter te begrijpen bij kinderen en volwassenen met Autisme
                        met
                        en zonder een ontwikkelingsachterstand/ verstandelijke beperking.
                    </p>

                    <div className="section-img img-class-3 about-img-mobile-1 fade-in">
                        <img src={photo4} alt="main cover"/>
                    </div>

                    <p className="fade-in">
                        In mijn werk als Orthopedagoog heb ik ervaren dat diagnostiek vaak onvolledig of verouderd is.
                        Dit
                        kan ervoor zorgen dat aansluiting bij de kern van de problemen niet altijd goed lukt. Daarnaast
                        is
                        er onvoldoende aandacht voor uitleg wat de resultaten van de diagnostiek betekent voor iedereen
                        die
                        ondersteuning moet bieden. Door goede uitleg te geven wat een diagnose betekent helpt dit voor
                        passende ondersteuning. Hierbij is het doel dat iedereen begrijpt wat een diagnose op papier nu
                        werkelijk betekent in de praktijk. Ik wil daarbij vroegtijdig mensen met Autisme en de omgeving
                        ondersteunen in het zoeken naar passende manieren om met Autisme en/of prikkelverwerking
                        problemen
                        om te leren gaan.
                    </p>

                    <div className="section-img img-class-3 about-img-mobile-1 photo-10 fade-in">
                        <img src={photo10} alt="main cover"/>
                    </div>

                    <p className="fade-in">
                        Vanuit het idee dat ieder mens uniek en daardoor Authentiek is en mag zijn bied ik mijn diensten
                        aan
                        ter ondersteuning en kennisverspreiding. Ik richt mij daarin op de vraag hoe het is om met deze
                        problemen om te gaan als persoon.
                    </p>

                    <p className="fade-in">
                        Mijn hulp richt zich op de mens met Autisme en/of prikkelverwerkingsproblemen, maar ook op de
                        omgeving waarin iemand zich staande moet houden. De ondersteuning die ik bied richt zich
                        diagnostiek, persoonlijke ondersteuning en op het geven van uitleg aan familie, scholen,
                        BSO/kinderdagverblijf en sportverenigingen.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;

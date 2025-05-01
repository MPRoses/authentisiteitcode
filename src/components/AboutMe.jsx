import React from 'react';
import './../css/Hero.css';
import './../css/AboutMe.css';

import photo2 from './../img/photo2.jpg';
import photo3 from './../img/photo3.jpg';
import photo4 from './../img/photo4.jpg';
import photo8 from './../img/photo8.jpg';
import photo9 from './../img/photo9.jpg';
import photo10 from './../img/photo10.jpg';

function AboutMe() {
    return (
        <div className="about-me section">

            <div className="section-wrapper about-me-wrapper">

                <h2 className="section-title about-me-title fade-in">
                    Over mij
                </h2>

                <div className="section-bio fade-in">
                    <p>
                        Hey! Ik ben Jorit, getrouwd en vader van 2 dochters. Ik heb lange tijd met veel plezier op het
                        voetbalveld gestaan als trainer van de jeugd van FC Lisse. Daarin stond plezier voor iedereen
                        voorop. Daarbij is persoonlijke ontwikkeling op ieders eigen manier en niveau zeer belangrijk. Om
                        persoonlijk tot rust te komen stap ik graag op de fiets om lange tochten te maken.
                    </p>

                    <p>
                        In mijn werk als zorgprofessional ben ik begonnen op een woongroep bij Stichting Epilepsie
                        Instellingen Nederland (SEIN). Daar heb ik gewerkt met volwassen met een verstandelijke beperking,
                        moeilijk verstaanbaar gedrag en epilepsie. De mensen die daar wonen hebben naast een verstandelijke
                        beperking ook vaak de diagnose Autisme Spectrum Stoornis.
                    </p>

                    <p>
                        Na mijn tijd bij SEIN heb ik gewerkt in de kliniek intensieve zorg van Rivierduinen in Oegstgeest.
                        Ook heb ik gewerkt voor het jeugd en gezinsteam Leiden namens stichting MEE Zuid Holland Noord en
                        ben ik begeleider geweest bij Ons Tweede Thuis.
                    </p>
                    <p className="read-more">
                        Na mijn tijd bij SEIN heb ik ..... (LEES MEER, moet nog even toevoegen, is handig als semi apart op telefoon)
                    </p>

                    <p className="full-bio">
                        Tijdens mijn werk als begeleider bij de diverse instellingen heb ik mij altijd zeer geïnteresseerd
                        in de vraag waar gedrag vandaan komt, waar ik dagelijks mee te maken kreeg. Ik vind het belangrijk
                        dat ik kan zorgen dat iemand zo fijn mogelijk de dag doorkomt. Vanuit deze gedachten heb ik
                        besloten om na mijn studie Social Work aan de Hogeschool INHolland (Haarlem) door te studeren als
                        Orthopedagoog aan de VU in Amsterdam. Na deze studie ben ik als Orthopedagoog verbonden aan meerdere
                        woningen voor mensen met een verstandelijke beperking. Daarin ondersteun ik de mensen met een
                        verstandelijke beperking en het netwerk eromheen en de begeleiders.
                    </p>

                    <p className="full-bio">
                        In mijn werk als orthopedagoog is mij opgevallen dat de mensen met wie ik werk zeer veel moeite
                        hebben met het leven in een groep. Zij krijgen de gehele dag veel prikkels vanuit de omgeving. Van
                        mensen met een Autisme Spectrum Stoornis is bekend dat zij vaak problemen ervaren in het verwerken
                        van de vele prikkels die zij op een dag ervaren. Om meer kennis te krijgen over hoe zij hiermee om
                        kunnen gaan, heb ik mij gespecialiseerd in Sensorische Informatie Verwerking (SI) en Autisme. Dit
                        heeft mij geholpen om deze problemen beter te begrijpen bij kinderen en volwassenen met Autisme met
                        en zonder een ontwikkelingsachterstand/ verstandelijke beperking.
                    </p>

                    <p className="full-bio">
                        In mijn werk als Orthopedagoog heb ik ervaren dat diagnostiek vaak onvolledig of verouderd is. Dit
                        kan ervoor zorgen dat aansluiting bij de kern van de problemen niet altijd goed lukt. Daarnaast is
                        er onvoldoende aandacht voor uitleg wat de resultaten van de diagnostiek betekent voor iedereen die
                        ondersteuning moet bieden. Door goede uitleg te geven wat een diagnose betekent helpt dit voor
                        passende ondersteuning. Hierbij is het doel dat iedereen begrijpt wat een diagnose op papier nu
                        werkelijk betekent in de praktijk. Ik wil daarbij vroegtijdig mensen met Autisme en de omgeving
                        ondersteunen in het zoeken naar passende manieren om met Autisme en/of prikkelverwerking problemen
                        om te leren gaan.
                    </p>

                    <p className="full-bio">
                        Vanuit het idee dat ieder mens uniek en daardoor Authentiek is en mag zijn bied ik mijn diensten aan
                        ter ondersteuning en kennisverspreiding. Ik richt mij daarin op de vraag hoe het is om met deze
                        problemen om te gaan als persoon.
                    </p>

                    <p className="full-bio">
                        Mijn hulp richt zich op de mens met Autisme en/of prikkelverwerkingsproblemen, maar ook op de
                        omgeving waarin iemand zich staande moet houden. De ondersteuning die ik bied richt zich
                        diagnostiek, persoonlijke ondersteuning en op het geven van uitleg aan familie, scholen,
                        BSO/kinderdagverblijf en sportverenigingen.
                    </p>
                </div>
            </div>

            {/* Restored original image layout */}
            <div className="section-img img-class-3 img-top-right about-me-img fade-in">
                <img src={photo2} alt="main cover" />
            </div>
            <div className="section-img img-class-2 img-middle-right about-me-img fade-in">
                <img src={photo3} alt="main cover" />
            </div>
            <div className="section-img img-class-1 img-bottom-right about-me-img fade-in">
                <img src={photo9} alt="main cover" />
            </div>
            <div className="section-img img-class-3 img-bottom-left about-me-img fade-in">
                <img src={photo4} alt="main cover" />
            </div>
            <div className="section-img img-class-2 img-middle-left about-me-img fade-in">
                <img src={photo10} alt="main cover" />
            </div>
            <div className="section-img img-class-1 img-top-left about-me-img fade-in">
                <img src={photo8} alt="main cover" />
            </div>
        </div>
    );
}

export default AboutMe;

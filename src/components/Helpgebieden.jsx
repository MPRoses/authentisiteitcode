import React from 'react';
import './../css/Helpgebieden.css';
import './../css/Hero.css';

import autisme from './../img/autisme.png';
import SI from './../img/SI.png';
import achterstand from './../img/achterstand.png';


function Helpgebieden() {

    return (
        <div className="helpgebieden section">
            <div className="section-wrapper">
                <div className="section-title">
                    Ik kijk graag naar wat wél werkt
                </div>
                <div className="section-bio">
                    Iedere persoon met autisme of een verstandelijke beperking is uniek. Ik help u inzicht krijgen in gedrag, prikkelverwerking en ondersteuningsbehoeften – zodat u, uw kind of cliënt meer rust en balans kan ervaren in het dagelijks leven.
                </div>
            </div>
            <div className="items-wrapper">
                <div className="item fade-in">
                    <div className="item-content">
                        <img src={autisme} alt="autisme" loading="eager"/>
                        <div className="title">
                            Wat is Autisme Spectrum Stoornis (ASS)?
                        </div>
                        <div className="bio">
                            Heeft u of uw kind de diagnose Autisme? Hoe nu verder? De zoektocht naar de juiste ondersteuning begint vaak met het begrijpen van wat deze diagnose werkelijk betekent en hoe we de omgeving het beste kunnen aanpassen om te ondersteunen.
                            <br></br> <br></br>
                            Binnen de huidige maatschappij is het beeld dat men heeft van mensen met Autisme vaak nog snel gelinkt aan stigmatische types, zoals in de film Rainman, waarbij iemand de meest ingewikkelde wiskundige formules kan oplossen, maar weinig aanpassingsvermogen heeft. Gelukkig wordt er veel gedaan om dit beeld te veranderen en een meer realistische weergave te bieden.
                            <br></br> <br></br>
                            Wanneer u inmiddels al iets meer bekend bent met ASS, weet u dat dit niet het geval is. Echter, het label "Autisme" betekent vaak dat er met een andere blik naar u (of uw kind) wordt gekeken. Ik ben er niet om Autisme "te repareren", maar om samen te ontdekken op welke gebieden binnen het spectrum ondersteuning kan helpen om te leren omgaan met het "anders denken". We gaan samen zoeken naar de juiste aanpassingen in de omgeving en de dagelijkse routines om het functioneren te verbeteren.
                        </div>
                    </div>
                </div>
                <div className="item fade-in">
                    <div className="item-content">
                        <img src={SI} alt="waves" loading="eager"/>
                        <div className="title">
                            Begrijpen en begeleiden van sensorische uitdagingen
                        </div>
                        <div className="bio">
                            Herkent u dat kind dat de hele tijd zit te wiebelen op zijn stoel, te tikken op tafel of continu reageert op alles wat er om hem/haar heen gebeurt? Wat is de functie van dit gedrag? Waarom doet iemand dit? We gebruiken allemaal onze zintuigen om de wereld om ons heen te ordenen en om geconcentreerd te kunnen werken. Maar, wanneer het zoeken naar prikkels heftige vormen aanneemt, is het belangrijk om verder te kijken naar de werking van de zintuigen.
                            <br></br> <br></br>
                            Zien, horen, ruiken, proeven en voelen zijn de bekende zintuigen, maar ook het evenwichtorgaan (vestibulair) en het gebruik van spieren en gewrichten (propriocepsis) spelen een belangrijke rol in het dagelijks verwerken van spanning in ons lichaam. Wanneer er een juiste balans is in het aanbod en verwerken van prikkels die via de zintuigen binnenkomen, kunt u een omgeving creëren die aansluit bij de behoefte van de persoon.
                            <br></br> <br></br>
                            Bij kinderen met Autisme en/of een verstandelijke beperking zien we vaak dat het bieden van voldoende mogelijkheden om de zintuigen te stimuleren of juist te beperken, kan leiden tot meer rust en daardoor minder ‘probleemgedrag’. Ik help u graag in het zoeken naar mogelijkheden om dit bij u thuis of in de omgeving passend in te richten. Zo creëren we een omgeving waarin het individu beter kan functioneren en zich meer in balans voelt.
                        </div>
                    </div>
                </div>
                <div className="item fade-in">
                    <div className="item-content">
                        <img src={achterstand} alt="achterstand" loading="eager"/>
                        <div className="title">
                            Ondersteuning bij ontwikkelingsachterstanden
                        </div>
                        <div className="bio">
                            Wanneer een kind achterblijft in zijn ontwikkeling, is het van groot belang om tijdig passende ondersteuning te bieden. Ieder mens ontwikkelt zich op verschillende, onderling samenhangende gebieden: cognitieve ontwikkeling, adaptieve vaardigheden, emotionele draagkracht, en motorische ontwikkeling. Deze beïnvloeden elkaar voortdurend en vormen samen het fundament voor groei.
                            <br></br> <br></br>
                            Daarnaast is de spraak- en taalontwikkeling essentieel. Praten leren is één ding, maar het begrijpen van gesproken taal en het juist interpreteren van non-verbale signalen, zoals gezichtsuitdrukkingen of lichaamstaal, verloopt soms moeizamer. Wanneer dit onvoldoende wordt herkend, kan dit leiden tot frustratie, miscommunicatie of probleemgedrag.
                            <br></br> <br></br>
                            Het is daarom belangrijk om goed inzicht te hebben in de mate van de verstandelijke beperking en mogelijk andere onderliggende problemen, zoals ASS.
                            <br></br> <br></br>
                            Vanuit mijn ervaring bij diverse organisaties weet ik hoe ingewikkeld de zoektocht naar passende ondersteuning kan zijn. Ik denk graag met u mee en samen kijken we naar wat wél werkt, zodat er meer duidelijkheid, rust en richting ontstaat in de dagelijkse praktijk.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Helpgebieden;
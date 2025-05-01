import React from 'react';
import './../css/Hero.css';
import './../css/Werkwijze.css';

import stars from './../img/stars.svg';

function Werkwijze() {
    return (
        <div className="werkwijze section">

            <div className="section-wrapper">

                <div className="section-title fade-in">
                    Werkwijze
                </div>

                <div className="section-bio">
                    <p className="fade-in">
                        Ieder traject begint met goed luisteren. In een eerste gesprek verkennen we samen wat er speelt,
                        waar de behoeften liggen, en wat u hoopt te bereiken. Mijn aanpak is persoonlijk, flexibel en
                        afgestemd op uw situatie, of het nu gaat om een kind, volwassene, gezin of organisatie.
                    </p>
                </div>

            </div>

            <div className="section-img">
                <img src="" alt="main cover"/>
            </div>

            <img src={stars} alt="stars" className="werkwijze-stars" />
            <div className="steps-container">
                <div className="step-item fade-in">
                    <div className="title">
                        Kennismaking & intake
                    </div>
                    <div className="bio">
                        Tijdens een laagdrempelig gesprek maken we kennis en brengen we samen in kaart welke vragen of zorgen er zijn. Dit kan bij u thuis, op locatie of online.
                    </div>
                </div>
                <div className="step-item fade-in">
                    <div className="title">
                        Afstemming op maat
                    </div>
                    <div className="bio">
                        Geen standaardtrajecten, maar een unieke aanpak die past. Ik kijk naar de context, de hulpvraag en de mogelijkheden. Of het nu gaat om een eenmalig consult, langdurige begeleiding, of een scholingstraject.                    </div>
                </div>
                <div className="step-item fade-in">
                    <div className="title">
                        Samenwerking & communicatie
                    </div>
                    <div className="bio">
                        Heldere afspraken, korte lijntjes en regelmatig afstemmen. Ik werk graag samen met ouders, begeleiders, leerkrachten en andere betrokkenen om de ondersteuning zo krachtig mogelijk te maken.
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Werkwijze;
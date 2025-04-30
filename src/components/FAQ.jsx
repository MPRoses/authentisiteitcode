import React, { useState } from 'react';
import './../css/FAQ.css';
import './../css/Hero.css';

const questions = [
    {
        question: "Hoe weet ik of uw aanpak past bij de behoeften van mijn kind of cliënt?",
        answer: "Mijn aanpak is afgestemd op individuele behoeften via een intake en observatieproces..."
    },
    {
        question: "Wat is het verschil tussen uw psycho-educatie en reguliere voorlichting over autisme?",
        answer: "Psycho-educatie bij mij is ervaringsgericht en sensorisch afgestemd..."
    },
    {
        question: "Kunt u ook ondersteuning bieden als er nog geen officiële diagnose is?",
        answer: "Ja, ondersteuning kan ook preventief of tijdens onderzoek worden aangeboden."
    },
    {
        question: "Hoe zorgt u ervoor dat scholing aansluit bij onze specifieke doelgroep of organisatie?",
        answer: "Ik stem de inhoud af in overleg en werk met praktijkvoorbeelden."
    },
    {
        question: "Wat kan ik verwachten van een ondersteuningsprofiel of sensorisch profiel?",
        answer: "Een helder, visueel overzicht van sterktes, uitdagingen en praktische strategieën."
    },
    {
        question: "Kan ik uw begeleiding (deels) vergoed krijgen via de zorgverzekering of PGB?",
        answer: "Ja, afhankelijk van indicatie of zorgprofiel zijn er vergoedingsmogelijkheden via PGB of aanvullende verzekering."
    }
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="FAQ section">
            <div className="section-wrapper">
                <div className="section-title">FAQ</div>
            </div>

            <div className="items-wrapper">
                {questions.map((item, index) => (
                    <div className="faq-block" key={index}>
                        <div
                            className={`item clickable ${openIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAnswer(index)}
                        >
                            <div className="title">{item.question}</div>
                            <div className="select" />
                            <div className="var" />
                        </div>

                        <div className={`answer-wrapper ${openIndex === index ? 'open' : ''}`}>
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>

            <div className="contact"></div>
        </div>
    );
}

export default FAQ;
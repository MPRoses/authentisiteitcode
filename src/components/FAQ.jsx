import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

import './../css/FAQ.css';
import './../css/Hero.css';
import mail from './../img/mail.png';
import phone from './../img/phone.png';
import location from './../img/location.png';
import send from './../img/send.png';



const questions = [
    {
        question: "Wat is het verschil tussen uw psycho-educatie en reguliere voorlichting over autisme, sensorische informatieverwerking of verstandelijke beperking?",
        answer: "Psycho-educatie is meer gericht op persoonsgebonden uitleg en ondersteuning terwijl reguliere voorlichting meer afgestemd is algemene kennis over Autisme, prikkelverwerking of gebieden van persoonlijke ontwikkeling zoals cognitieve, adaptieve, sociaal of emotionele ontwikkeling."
    },
    {
        question: "Kunt u ook ondersteuning bieden als er nog geen officiële diagnose is?",
        answer: "Ja, ondersteuning kan ook preventief of tijdens onderzoek worden aangeboden, dit wordt echter niet vergoed vanuit de zorgverzekering, WMO of PGB. U kunt contact opnemen telefonisch via het formulier voor een intake of korte omschrijving van de klachten, waarna ik u kan helpen met het zoeken naar de mogelijkheden."
    },
    {
        question: "Hoe zorgt u ervoor dat scholing aansluit bij onze specifieke doelgroep of organisatie?",
        answer: "Samen met u onderzoeken wij de hulpvraag van u of uw doelgroep, waarna we de inhoud afstemmen en in overleg werk en praktijkvoorbeelden behandelen. Voorafgaand maak ik graag kennis op de locatie om de doelgroep en de situatie te kunnen zien, zodat de scholing aansluit bij u en uw organisatie."
    },
    {
        question: "Wat kan ik verwachten van een ondersteuningsprofiel of sensorisch profiel?",
        answer: "Bij een ondersteuningsprofiel onderzoeken we de aandachtsgebieden die ondersteuning behoeven om tot persoonlijke groei te kunnen komen. \n\n Een sensorisch profiel maakt een schets van de werking van de zintuigen. Is er sprake van onder- of overgevoeligheid en welk gedrag ziet u hierdoor terug."
    },
    {
        question: "Wordt ondersteuning bij Autisme vergoed door gemeente of zorgverzekeraars?",
        answer: "Coaching bij autisme wordt niet vergoed door zorgverzekeraars, maar kan wel betaald worden vanuit de volgende regelingen: een Persoonsgebonden Budget (PGB), de Wet maatschappelijke ondersteuning (Wmo), of de Jeugdwet (voor jongeren).Ook de Werkgever of de arbodienst kan een rol spelen in de financiering via de Wet verbetering poortwachter. Informeer bij de gemeente, het zorgkantoor, je werkgever, of bij de autismecoach zelf naar de specifieke mogelijkheden en de aanvraagprocedures. \n \n Mogelijkheden voor vergoeding: \n \n Persoonsgebonden Budget (PGB):\n Dit is een budget dat je kunt aanvragen om zelf je zorg en begeleiding te organiseren, inclusief coaching.\n \n Wmo (Wet maatschappelijke ondersteuning):\n Voor volwassenen met autisme kan levensloopbegeleiding of een andere vorm van ondersteuning betaald worden vanuit de Wmo. \n \n Jeugdwet: \nVoor jongeren met autisme kan coaching vergoed worden vanuit de Jeugdwet, dit gaat via de gemeente. \n \n Werkgever/Arbodienst: \n Als de coaching gerelateerd is aan werk, bijvoorbeeld re-integratie, kan de werkgever of de arbodienst de kosten vergoeden.\n" +
            "Stappen om de mogelijkheden te verkennen:\n 1.Neem contact op met je gemeente: \n Vraag naar de mogelijkheden voor een PGB, Wmo-ondersteuning, of vergoeding via de Jeugdwet. \n 2.Bespreek dit met je werkgever:\n Als de coaching een relatie heeft met werk, vraag naar de mogelijkheden voor vergoeding via de werkgever of arbodienst. \n 3.Overleg met de autismecoach: \n Zij kunnen je informeren over hoe zij dergelijke trajecten in het verleden hebben gefinancierd en je eventueel helpen bij het aanvraagproces."
    },
    {
        question: "Is er een wachtlijst en hoe lang duurt het voordat mijn aanmelding in behandeling wordt genomen?",
        answer: "Authentisiteit heeft momenteel nog geen wachtlijst. Na aanmelding wordt er contact met u opgenomen voor een intake gesprek, om te onderzoeken welke ondersteunen voor u passend is."
    }
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const formRef = useRef(null);

    const toggleAnswer = (index) => {
        setOpenIndex(prev => {
            const newIndex = prev === index ? null : index;
            const rootElement = document.getElementById('root');
            const contentContainer = document.querySelector('.content-container');

            if (newIndex !== null) {
                if (rootElement) rootElement.style.height = `${rootElement.offsetHeight + 50}px`;
                if (contentContainer) contentContainer.style.height = `${contentContainer.offsetHeight + 50}px`;
            } else {
                if (rootElement) rootElement.style.height = `${rootElement.offsetHeight - 50}px`;
                if (contentContainer) contentContainer.style.height = `${contentContainer.offsetHeight - 50}px`;
            }
            return newIndex;
        });
    };

    const handleTextareaClick = () => {
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 2000);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_m0qnznj', 'template_750dz28', formRef.current, {
                publicKey: 'eycXguGEQAxy7qlgN',
            })
            .then(() => {
                const popup = document.createElement('div');
                popup.textContent = 'Je bericht is verstuurd!';
                popup.style.position = 'fixed';
                popup.style.top = '20px';
                popup.style.left = '50%';
                popup.style.transform = 'translateX(-50%)';
                popup.style.backgroundColor = '#002D3C';
                popup.style.color = 'white';
                popup.style.padding = '0.7em 1.5em';
                popup.style.borderRadius = '8px';
                popup.style.zIndex = 9999;
                popup.style.fontFamily = 'Inter, sans-serif';
                popup.style.fontSize = '1rem';
                document.body.appendChild(popup);
                setTimeout(() => popup.remove(), 4000);

                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch((error) => {
                console.error('FAILED TO SEND...', error.text);
            });
    };


    return (
        <div className="FAQ section">
            <div className="section-wrapper fade-in">
                <div className="section-title">FAQ</div>
            </div>

            <div className="items-wrapper">
                {questions.map((item, index) => (
                    <div className="faq-block fade-in" key={index}>
                        <div
                            className={`item clickable ${openIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAnswer(index)}
                        >
                            <div className="title">{item.question}</div>
                            <div className="select"/>
                            <div className="var"/>
                        </div>

                        <div className={`answer-wrapper ${openIndex === index ? 'open' : ''}`}>
                            {item.answer.split("\n").map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="contact">
                <div className="title fade-in">Kom in contact</div>

                <div className="title title-form fade-in">Contactformulier</div>

                <div className="contact-form fade-in">
                    <form className="form" onSubmit={handleFormSubmit} ref={formRef}>
                        <div className="form-row">
                            <input type="text" placeholder="Volledige naam" name="name" required/>
                            <input type="tel" placeholder="Telefoonnummer" name="phone" required/>
                            <input type="email" placeholder="Email" name="email" required/>
                            <input type="hidden" name="time" style={{display: "none"}}
                                   value={new Date().toLocaleString()}/>
                        </div>
                        <div className="form-message">
                            <textarea
                                placeholder="Je bericht"
                                name="message"
                                required
                                onClick={handleTextareaClick}
                            ></textarea>
                            <button type="submit" className="send-btn">
                                <img src={send} className="clickable" alt="Verstuur"/>
                            </button>
                        </div>
                    </form>
                    {popupVisible && (
                        <div className="popup-send"></div>
                    )}
                </div>

                <div className="items-container fade-in">
                    <div className="item">
                        <img src={mail} alt="contact thingy"/>
                        <p>jorit@authentisiteit.com</p>
                    </div>
                    <div className="item">
                        <img src={phone} alt="contact thingy"/>
                        <p>+31 06 28353794</p>
                    </div>
                    <div className="item">
                        <img src={location} alt="contact thingy"/>
                        <p>Lisse, Bollenstreek</p>
                    </div>
                </div>
            </div>

            <div className="creditsv2">
                © 2025 Jorit Doeswijk. KVK: 97069280
            </div>
        </div>
    );
}

export default FAQ;

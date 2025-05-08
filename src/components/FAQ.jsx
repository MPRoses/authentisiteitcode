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
                            <div className="select" />
                            <div className="var" />
                        </div>

                        <div className={`answer-wrapper ${openIndex === index ? 'open' : ''}`}>
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>

            <div className="contact">
                <div className="title fade-in">Kom in contact</div>
                <div className="items-container fade-in">
                    <div className="item">
                        <img src={mail} alt="contact thingy" />
                        <p>jdoeswijk@hotmail.com</p>
                    </div>
                    <div className="item">
                        <img src={phone} alt="contact thingy" />
                        <p>+31 06 12345678</p>
                    </div>
                    <div className="item">
                        <img src={location} alt="contact thingy" />
                        <p>Lisse, Bollenstreek</p>
                    </div>
                </div>

                <div className="title title-form fade-in">Contactformulier</div>

                <div className="contact-form fade-in">
                    <form className="form" onSubmit={handleFormSubmit} ref={formRef}>
                        <div className="form-row">
                            <input type="text" placeholder="Volledige naam" name="name" required/>
                            <input type="tel" placeholder="Telefoonnummer" name="phone" required/>
                            <input type="email" placeholder="Email" name="email" required/>
                            <input type="hidden" name="time" style={{display: "none"}} value={new Date().toLocaleString()}/>
                        </div>
                        <div className="form-message">
                            <textarea
                                placeholder="Je bericht"
                                name="message"
                                required
                                onClick={handleTextareaClick}
                            ></textarea>
                            <button type="submit" className="send-btn">
                                <img src={send} className="clickable" alt="Verstuur" />
                            </button>
                        </div>
                    </form>
                    {popupVisible && (
                        <div className="popup-send"></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FAQ;
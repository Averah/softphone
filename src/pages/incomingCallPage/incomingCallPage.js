import { phone } from '../../api/phone/phone';
import { openPage } from '../../router/router';
import './incomingCallPage.css';

export const incomingCallPage = (phoneNumber) => {
    const answerButton = document.querySelector('.answerButton');
    const hangUpButton = document.querySelector('.hangUpButton');
    const contactNumberDiv = document.querySelector('.contactNumber')
    contactNumberDiv.innerHTML = phoneNumber

    const navbar = document.getElementById('navbar');
    navbar.style.display = 'none';

    phone.sessionFinishHandler({
        onFinished: () => {
            openPage('dialer');
        },
        contact: phoneNumber,
    });

    hangUpButton.onclick = () => {
        phone.addToHistory(phoneNumber)
        phone.hangUpCall();
        openPage('dialer');
        navbar.style.display = null;
    };
    
    answerButton.onclick = () => {
        const contact = phone.answerCall();
        const isOutgoingCall = false;
        openPage('currentCall', contact, isOutgoingCall)
    };
}
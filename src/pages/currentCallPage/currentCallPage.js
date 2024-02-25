import { phone } from '../../api/phone/phone';
import { openPage } from '../../router/router';
import './currentCallPage.css';

export const currentCallPage = (phoneNumber) => {
    const hangUpButton = document.querySelector('.hangUpButton');
    const contactNumberDiv = document.querySelector('.contactNumber')
    const callStatus = document.getElementById('callStatus')
    const callTime = document.getElementById('callTime')
    contactNumberDiv.innerHTML = phoneNumber

    phone.call({
        contact: phoneNumber,
        onFinished: (failCause) => {
            switch (failCause) {
                case 'Busy':
                    callStatus.innerHTML = 'Сброшено';
                    break;                
                case 'Unavailable':
                    callStatus.innerHTML = 'Недоступен';
                    break;
            
                default:
                    callStatus.innerHTML = 'Разговор окончен';
                    break;
            }
            setTimeout(() => openPage('dialer'), 1000);
        },
        onAccepted: () => {
            callStatus.innerHTML = 'Идет разговор';
        },
        onConnecting: () => {
            callStatus.innerHTML = 'Устанавливаем соединение...';
        },        
        onProgress: () => {
            callStatus.innerHTML = 'Звоним...';
        },
        onTimerChange: (time) => {
            callTime.innerHTML = time;
        }
    })

    hangUpButton.onclick = () => phone.hangUpCall();
}
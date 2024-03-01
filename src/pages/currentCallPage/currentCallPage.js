import { phone } from '../../api/phone/phone';
import { openPage } from '../../router/router';
import './currentCallPage.css';

export const currentCallPage = (phoneNumber, isOutgoingCall) => {
    const hangUpButton = document.querySelector('.hangUpButton');
    const contactNumberDiv = document.querySelector('.contactNumber')
    const callStatus = document.getElementById('callStatus')
    const callTime = document.getElementById('callTime')
    contactNumberDiv.innerHTML = phoneNumber

    const navbar = document.getElementById('navbar');
    navbar.style.display = 'none';

    let openDialerPageTimerId

    if (isOutgoingCall) {
        phone.call(phoneNumber)
    }

    phone.sessionListenersHandler({
        contact: phoneNumber,
        onFinished: (failCause) => {
            navbar.style.display = null;
            switch (failCause) {
                case 'Busy':
                    callStatus.innerHTML = 'Занято';
                    break;
                case 'Unavailable':
                    callStatus.innerHTML = 'Недоступен';
                    break;

                default:
                    callStatus.innerHTML = 'Разговор окончен';
                    break;
            }
            chrome?.runtime?.sendMessage({
                action: 'updateBadge',
                value: 'End'
            });
            setTimeout(() => {
                chrome?.runtime?.sendMessage({
                    action: 'updateBadge',
                    value: null
                });
            }, 1000);
            openDialerPageTimerId = setTimeout(() => {
                openPage('dialer')
            }, 1000);
        },
        onAccepted: () => {
            callStatus.innerHTML = 'Идет разговор';
            chrome?.runtime?.sendMessage({
                action: 'updateBadge',
                value: 'Talk'
            });
        },
        onConnecting: () => {
            callStatus.innerHTML = 'Устанавливаем соединение...';
            chrome?.runtime?.sendMessage({
                action: 'updateBadge',
                value: 'Wait'
            });
        },
        onProgress: () => {
            callStatus.innerHTML = 'Звоним...';
        },
        onTimerChange: (time) => {
            callTime.innerHTML = time;
        }
    })

    hangUpButton.onclick = () => phone.hangUpCall();

    return () => {
        clearTimeout(openDialerPageTimerId)
    }
}
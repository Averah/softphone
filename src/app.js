import { chromeStorage } from './utils/isomorphicStorage';
import { openPage } from './router/router';
import { phone } from './api/phone/phone';

const dialerBtn = document.getElementById('dialerBtn');
const callHistoryBtn = document.getElementById('callHistoryBtn');

dialerBtn.addEventListener('click', () => openPage('dialer'));
callHistoryBtn.addEventListener('click', () => openPage('callHistory'));

chromeStorage.getItem('auth').then((authData) => {
    if (!authData) {
        openPage('login')
    } else {
        phone.login({
            username: authData.username,
            password: authData.password,
            server: authData.server,
            onRegistrationFailed: () => openPage('login'),
            onRegistered: () => openPage('dialer'),
            onIncomingCall: (contact) => openPage('incomingCall', contact),
        });
    }
})

// чтобы отследить закрытие расширения
chrome?.runtime?.connect({ name: "popup" });
window.addEventListener('unload', () => {
    phone.hangUpCall();
});

// по этому шорткату звоним последнему контакту из истории
window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && e.ctrlKey) {
        chromeStorage.getItem('callHistory').then((callHistory) => {
            if (callHistory?.length && callHistory.length > 0) {
                openPage('currentCall', callHistory[callHistory.length - 1].number);
            }
        })
    }
});

setTimeout(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .catch(function () {
            chrome.tabs.create({
                url: chrome.extension.getURL("options.html"),
                selected: true
            })
        });
}, 100);

console.log(phone.session);
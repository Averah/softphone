import { chromeStorage } from './utils/chromeStorage';
import { openPage } from './router/router';
import { phone } from './api/phone/phone';

const content = document.getElementById('content');
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
            onRegistrationFailed: () => openPage('login')
        });
    }
})

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

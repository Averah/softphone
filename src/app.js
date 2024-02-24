import { chromeStorage } from './utils/chromeStorage';
import { openPage } from './router/router';
import { phone } from './api/phone/phone';

const content = document.getElementById('content');
const dialerBtn = document.getElementById('dialerBtn');
const callHistoryBtn = document.getElementById('callHistoryBtn');

dialerBtn.addEventListener('click', () => openPage('dialer'));
callHistoryBtn.addEventListener('click', () => openPage('callHistory'));

chromeStorage.getItem('auth').then((result) => {
    if (!result) {
        openPage('login')
    } else {
        const authData = JSON.parse(result);
        phone.login(authData.username, authData.password, authData.server, () => openPage('login'))
    }
})

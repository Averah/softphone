import { chromeStorage } from './utils/chromeStorage';
import { phoneConnection } from './phoneConnection/phoneConnection';
import { openPage } from './router/router';

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
        phoneConnection(authData.username, authData.password, authData.server, () => openPage('login'))
    }
})

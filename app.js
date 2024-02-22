import { dialer } from './dialer/dialer';
import { callHistory } from './callHistory/callHistory';
import { loadPageWithStylesAndScripts } from './utils/loadPageWithStylesAndScripts';
import { login } from './login/login';

const content = document.getElementById('content');
const dialerBtn = document.getElementById('dialerBtn');
const callHistoryBtn = document.getElementById('callHistoryBtn');

dialerBtn.addEventListener('click', () => loadPageWithStylesAndScripts('/dialer.html', dialer));
callHistoryBtn.addEventListener('click', () => loadPageWithStylesAndScripts('/callHistory.html', callHistory));

loadPageWithStylesAndScripts('/login.html', login)

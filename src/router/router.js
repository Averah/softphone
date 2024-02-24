import { callHistoryPage } from "../pages/callHistoryPage/callHistoryPage";
import { currentCallPage } from "../pages/currentCallPage/currentCallPage";
import { dialerPage } from "../pages/dialerPage/dialerPage";
import { loginPage } from "../pages/loginPage/loginPage";
import { loadPageWithStylesAndScripts } from "../utils/loadPageWithStylesAndScripts"

export const openPage = (pageName, ...pageArgs) => {
    switch (pageName) {
        case 'dialer':
            loadPageWithStylesAndScripts('/dialer.html', () => dialerPage(...pageArgs))
            break; 
        case 'login':
            loadPageWithStylesAndScripts('/login.html', () => loginPage(...pageArgs))
            break;
        case 'callHistory':
            loadPageWithStylesAndScripts('/callHistory.html', () => callHistoryPage(...pageArgs))
            break;
        case 'currentCall':
            loadPageWithStylesAndScripts('/currentCall.html', () => currentCallPage(...pageArgs))
            break;
        default:
            break;
    }
}
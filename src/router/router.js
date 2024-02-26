import { callHistoryPage } from "../pages/callHistoryPage/callHistoryPage";
import { currentCallPage } from "../pages/currentCallPage/currentCallPage";
import { dialerPage } from "../pages/dialerPage/dialerPage";
import { loginPage } from "../pages/loginPage/loginPage";
import { loadPageWithStylesAndScripts } from "../utils/loadPageWithStylesAndScripts"

const pageCleanupFunctions = {};

export const openPage = (pageName, ...pageArgs) => {
    Object.keys(pageCleanupFunctions).forEach((key) => {
        pageCleanupFunctions[key] && pageCleanupFunctions[key]()
    })
    switch (pageName) {
        case 'dialer':
            loadPageWithStylesAndScripts('/dialer.html', () => dialerPage(...pageArgs)).then((cleanUpFunc) => {
                pageCleanupFunctions['dialer'] = cleanUpFunc;
            })
            break;
        case 'login':
            loadPageWithStylesAndScripts('/login.html', () => loginPage(...pageArgs)).then((cleanUpFunc) => {
                pageCleanupFunctions['login'] = cleanUpFunc;
            })
            break;
        case 'callHistory':
            loadPageWithStylesAndScripts('/callHistory.html', () => callHistoryPage(...pageArgs)).then((cleanUpFunc) => {
                pageCleanupFunctions['callHistory'] = cleanUpFunc;
            })
            break;
        case 'currentCall':
            loadPageWithStylesAndScripts('/currentCall.html', () => currentCallPage(...pageArgs)).then((cleanUpFunc) => {
                pageCleanupFunctions['currentCall'] = cleanUpFunc;
            })
            break;
        default:
            break;
    }
}
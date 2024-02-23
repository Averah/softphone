import { callHistory } from "../callHistory/callHistory";
import { currentCall } from "../currentCall/currentCall";
import { dialer } from "../dialer/dialer";
import { login } from "../login/login";
import { loadPageWithStylesAndScripts } from "../utils/loadPageWithStylesAndScripts"

export const openPage = (pageName, ...pageArgs) => {
    switch (pageName) {
        case 'dialer':
            loadPageWithStylesAndScripts('/dialer.html', () => dialer(...pageArgs))
            break; 
        case 'login':
            loadPageWithStylesAndScripts('/login.html', () => login(...pageArgs))
            break;
        case 'callHistory':
            loadPageWithStylesAndScripts('/callHistory.html', () => callHistory(...pageArgs))
            break;
        case 'currentCall':
            loadPageWithStylesAndScripts('/currentCall.html', () => currentCall(...pageArgs))
            break;
        default:
            break;
    }
}
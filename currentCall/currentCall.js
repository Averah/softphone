import { dialer } from "../dialer/dialer";
import { loadPageWithStylesAndScripts } from "../utils/loadPageWithStylesAndScripts";

export const currentCall = (phoneNumber) => {
    const hangUpButton = document.querySelector('.hangUpButton');

    hangUpButton.addEventListener('click', () => {
        console.log('нажата');
          loadPageWithStylesAndScripts('/dialer.html', dialer)
      });
}
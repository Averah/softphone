import { dialer } from "../dialer/dialer";
import { loadPageWithStylesAndScripts } from "../utils/loadPageWithStylesAndScripts";

export const currentCall = (phoneNumber) => {
    const hangUpButton = document.querySelector('.hangUpButton');
    const contactNumberDiv = document.querySelector('.contactNumber')
    contactNumberDiv.innerHTML = phoneNumber

    hangUpButton.addEventListener('click', () => {
          loadPageWithStylesAndScripts('/dialer.html', dialer)
      });
}
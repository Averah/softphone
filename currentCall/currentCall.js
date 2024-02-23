import { ua } from "../phoneConnection/phoneConnection";
import { openPage } from "../router/router";
import { chromeStorage } from "../utils/chromeStorage";

export const currentCall = (phoneNumber) => {
    const hangUpButton = document.querySelector('.hangUpButton');
    const contactNumberDiv = document.querySelector('.contactNumber')
    contactNumberDiv.innerHTML = phoneNumber

    console.log('ua', ua);

    chromeStorage.getItem('auth').then(res => {
        const server = JSON.parse(res).server;
        ua.call(`sip:${phoneNumber}@${server}`)
    });

    hangUpButton.addEventListener('click', () => {
          openPage('dialer')
      });
}
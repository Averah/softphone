import { openPage } from "../../router/router";
import './dialerPage.css'

export const dialerPage = () => {
  const buttons = document.querySelectorAll('.numberButton');
  const numberInput = document.getElementById('numberInput');
  const callButton = document.querySelector('.dialerCallButton');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      numberInput.value += button.innerHTML;
    });
  });

  callButton.addEventListener('click', () => {
    if (numberInput.value) {
      // loadPageWithStylesAndScripts('/currentCall.html', () => {
      //   currentCall(numberInput.value)
      // })
      openPage('currentCall', numberInput.value)
    }
  });

  // chrome.commands.onCommand.addListener((command) => {
  //   console.log(`Command: ${command}`);
  // });

}
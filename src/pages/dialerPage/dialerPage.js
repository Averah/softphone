import { openPage } from "../../router/router";
import './dialerPage.css'

export const dialerPage = () => {
  const buttons = document.querySelectorAll('.numberButton');
  const numberInput = document.getElementById('numberInput');
  const callButton = document.querySelector('.dialerCallButton');
  const isOutgoingCall = true;

  buttons.forEach((button) => {
    button.onclick = () => {
      numberInput.value += button.innerHTML;
    }
  });

  callButton.onclick = () => {
    if (numberInput.value) {
      openPage('currentCall', numberInput.value, isOutgoingCall)
    }
  }
}
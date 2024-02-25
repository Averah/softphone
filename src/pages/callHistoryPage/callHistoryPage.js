import { openPage } from '../../router/router';
import { chromeStorage } from '../../utils/chromeStorage'
import './callHistoryPage.css'

export const callHistoryPage = () => {
  chromeStorage.getItem('callHistory').then((result) => {
    const list = document.getElementById('list');

    if (!result) {
      list.innerHTML = '<div class="callHistoryNoCalls">Нет последних вызовов</div>';
    } else {
      list.innerHTML = result.reverse().map((callItem) => `
      <li class="callItem">
        <span>${callItem.number}</span>
        <button class="callHistoryButton" data-contact="${callItem.number}">
          <img class="historyCallImage" src="/images/greenPhone.png" />
        </button>
      </li>
      `).join('')

      const buttons = document.querySelectorAll('.callHistoryButton');

      buttons.forEach((element) => {
        const buttonListener = () => {
          openPage('currentCall', element.getAttribute('data-contact'))
          element.removeEventListener('click', buttonListener);
        }
        element.onclick = () => {
          openPage('currentCall', element.getAttribute('data-contact'))
        }
      })
    }
  })
}
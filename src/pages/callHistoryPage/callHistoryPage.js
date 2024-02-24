import './callHistoryPage.css'

export const callHistoryPage = () => {
  const callList = document.getElementById('callList');

  // Пример данных истории вызовов
  const callHistoryData = [
    { number: '1234567890', date: '2024-02-19 09:30:00' },
    { number: '9876543210', date: '2024-02-18 15:45:00' },
    { number: '5555555555', date: '2024-02-17 11:20:00' }
  ];

  callHistoryData.forEach((call) => {
    const callItem = document.createElement('li');
    callItem.classList.add('callItem');
    callItem.innerHTML = `
    <div class="number">${call.number}</div>
    <div class="date">${call.date}</div>
  `;
    callItem.addEventListener('click', () => {
      // Набор номера при клике на элемент истории вызовов
      const numberInput = window.opener.document.getElementById('number');
      numberInput.value = call.number;
    });
    // callList.appendChild(callItem);
  });


}
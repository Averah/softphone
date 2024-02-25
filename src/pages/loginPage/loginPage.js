import { phone } from '../../api/phone/phone';
import './loginPage.css';

export const loginPage = () => {
  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const serverInput = document.getElementById('server');
  const statusDiv = document.getElementById('status');

  registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const server = serverInput.value;

    if (username && password && server) {
      phone.login(username, password, server, () => {
        statusDiv.innerHTML = 'Ошибка при подключении';
      })
    }
    else {
      statusDiv.innerHTML = 'Заполните все поля';
    }
  }
}





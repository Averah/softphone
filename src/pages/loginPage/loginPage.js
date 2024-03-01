import { phone } from '../../api/phone/phone';
import { openPage } from '../../router/router';
import './loginPage.css';

export const loginPage = () => {
  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const serverInput = document.getElementById('server');
  const statusDiv = document.getElementById('status');

  const navbar = document.getElementById('navbar');
  navbar.style.display = 'none';

  registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const server = serverInput.value;

    if (username && password && server) {
      phone.login({
        username,
        password,
        server,
        onRegistrationFailed: () => {
          statusDiv.innerHTML = 'Ошибка при подключении';
        },
        onRegistered: () => {
          navbar.style.display = null;
          openPage('dialer');
        }
      })
    }
    else {
      statusDiv.innerHTML = 'Заполните все поля';
    }
  }
}





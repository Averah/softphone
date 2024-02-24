import { phone } from '../phoneConnection/phoneConnection';

export const login = () => {
  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const serverInput = document.getElementById('server');
  const statusDiv = document.getElementById('status');

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const server = serverInput.value;

    if (username && password && server) {
      phone.login(username, password, server)
    }
    else {
      statusDiv.innerHTML = 'Заполните все поля';
    }

  })
}





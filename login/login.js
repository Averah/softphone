import JsSIP from 'jssip';
import { dialer } from '../dialer/dialer';
import { loadPageWithStylesAndScripts } from '../utils/loadPageWithStylesAndScripts';

export const login = () => {

  const registerForm = document.getElementById('registerForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const serverInput = document.getElementById('server');
  const statusDiv = document.getElementById('status');



  const register = (username, password, server) => {
    let ua;
    const socket = new JsSIP.WebSocketInterface(`wss://${server}`);
    const configuration = {
      sockets: [socket],
      uri: `sip:${username}@${server}`,
      password
    };
    ua = new JsSIP.UA(configuration);
    ua.on('registrationFailed', () => {
      console.log('Registration failed');
      statusDiv.innerHTML = 'Registration failed';
    });

    ua.on('connected', () => {
      console.log('Connected');
      statusDiv.innerHTML = 'Connected';
    });

    ua.on('registered', () => {
      console.log('Registered');
      statusDiv.innerHTML = 'Registered';
      chrome.storage.session.set({registered: true}).then(() => {
        console.log("Value is set");
      })
    });

    ua.on('disconnected', (e) => {
      console.log('disconnected', e);
    });
    ua.on('newRTCSession', (e) => {
      console.log('newRTCSession', e);
    });

    ua.start();

  }

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const server = serverInput.value;

    if (username && password && server) {
      register(username, password, server)
    }
    else {
      statusDiv.innerHTML = 'Заполните все поля';
    }

  })
}





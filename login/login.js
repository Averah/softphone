import JsSIP from 'jssip';



// const socket = new JsSIP.WebSocketInterface(`ws://voip.uiscom.ru:9050`);
// const configuration = {
//   sockets: [socket],
//   uri: `sip:0332740@voip.uiscom.ru`,
//   password: 'Z8dPNMqmLP',
// ws_servers: 'ws://voip.uiscom.ru:9050'
// };

// ua = new JsSIP.UA(configuration);
// console.log('ua', ua);
// ua.on('registrationFailed', () => {
//   console.log('Registration failed');
// });
// ua.on('registered', () => {
//   console.log('Registered');
// });
// ua.on('connected', () => {
//   console.log('connected');
// });

// ua.on('disconnected', (e) => {
//   console.log('disconnected', e);
// });
// ua.on('newRTCSession', (e) => {
//   console.log('newRTCSession', e);
// });
// ua.start();


export const login = (username, password, server) => {

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





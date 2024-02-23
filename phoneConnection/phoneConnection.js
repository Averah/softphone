import JsSIP from 'jssip';
import { openPage } from '../router/router';
import { chromeStorage } from "../utils/chromeStorage";

/** @type {JsSIP.UA} */
export let ua;

export const phoneConnection = (username, password, server, onRegistrationFailed) => {
    const socket = new JsSIP.WebSocketInterface(`wss://${server}`);
    const configuration = {
        sockets: [socket],
        uri: `sip:${username}@${server}`,
        password
    };
    // let ua
    ua = new JsSIP.UA(configuration);
    ua.on('registrationFailed', (e) => {
        console.log('Registration failed', e);
        // statusDiv.innerHTML = 'Registration failed';
        onRegistrationFailed && onRegistrationFailed()
    });

    ua.on('connected', () => {
        console.log('Connected');
        // statusDiv.innerHTML = 'Connected';
    });

    ua.on('registered', () => {
        console.log('Registered');
        // statusDiv.innerHTML = 'Registered';
        chromeStorage.setItem('auth', JSON.stringify({username, password, server}))
        openPage('dialer')

    });

    ua.on('disconnected', (e) => {
        console.log('disconnected', e);
    });
    ua.on('newRTCSession', (e) => {
        console.log('newRTCSession', e);
    });

    ua.start();

    setTimeout(() => {
        const eventHandlers = {
            'progress': function(e) {
              console.log('call is in progress');
            },
            'failed': function(e) {
              console.log('call failed with cause: '+ e.data.cause);
            },
            'ended': function(e) {
              console.log('call ended with cause: '+ e.data.cause);
            },
            'confirmed': function(e) {
              console.log('call confirmed');
            }
          };
          
          const options = {
            'eventHandlers'    : eventHandlers,
            'mediaConstraints' : { 'audio': true, 'video': true }
          };
        const session = ua.call('sip:0332739@voip.uiscom.ru', {
            pcConfig:
            {
                hackStripTcp: true, // Важно для хрома, чтоб он не тупил при звонке
                rtcpMuxPolicy: 'negotiate', // Важно для хрома, чтоб работал multiplexing. Эту штуку обязательно нужно включить на астере.
                iceServers: []
            },
            mediaConstraints:
            {
                audio: true, // Поддерживаем только аудио
                video: false
            },
            rtcOfferConstraints:
            {
                offerToReceiveAudio: 1, // Принимаем только аудио
                offerToReceiveVideo: 0
            }
        })

        // session.connection
        console.log('session.connection', session.connection);
        console.log('session.isEstablished', session.isEstablished());

        session.on('connecting', () => {
            console.log('Установление соединения...');
          });
        
          session.on('progress', () => {
            console.log('Прогресс звонка...');
          });
        
          session.on('accepted', () => {
            console.log('Звонок принят');
          });
        
          session.on('failed', (data) => {
            console.error('Ошибка звонка', data);
          });
        
          session.on('ended', () => {
            console.log('Звонок завершен');
          });
        // session.
    }, 5000)
}
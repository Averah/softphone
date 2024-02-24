import JsSIP from 'jssip';
import { RTCSession } from 'jssip/lib/RTCSession';
import { openPage } from '../../router/router';
import { chromeStorage } from "../../utils/chromeStorage";

/** @type {JsSIP.UA} */
export let ua;

export const phone = {
    /** @type {JsSIP.UA} */
    ua: null,
    /** @type {RTCSession} */
    session: null,
    server: null,
    callTimerId: null,
    login(username, password, server, onRegistrationFailed) {
        this.server = server;
        const socket = new JsSIP.WebSocketInterface(`wss://${server}`);
        const configuration = {
            sockets: [socket],
            uri: `sip:${username}@${server}`,
            password
        };
        this.ua = new JsSIP.UA(configuration);
        this.ua.on('registrationFailed', (e) => {
            console.log('Registration failed', e);
            onRegistrationFailed && onRegistrationFailed()
        });
    
        this.ua.on('connected', () => {
            console.log('Connected');
        });
    
        this.ua.on('registered', () => {
            console.log('Registered');
            chromeStorage.setItem('auth', JSON.stringify({username, password, server}))
            openPage('dialer')
    
        });
    
        this.ua.on('disconnected', (e) => {
            console.log('disconnected', e);
        });
        this.ua.on('newRTCSession', (e) => {
            console.log('newRTCSession', e);
        });
    
        this.ua.start();
    },
    call({contact, onFinished, onConnecting, onProgress, onAccepted, onTimerChange}) {
        this.session = this.ua.call(`sip:${contact}@${this.server}`,
            {
                mediaConstraints: { audio: true, video: false },
                rtcOfferConstraints: { 'offerToReceiveAudio': true, 'offerToReceiveVideo': false }
            })

        this.session.on('connecting', () => {
            console.log('Установление соединения...');
            onConnecting && onConnecting()
        });

        this.session.on('progress', () => {
            console.log('Прогресс звонка...');
            onProgress && onProgress()
        });

        
        this.session.on('accepted', () => {
            console.log('Звонок принят');

            this.callTimerId = setInterval(() => {
                const callStartTime = new Date(this.session.start_time);
                const talkTimeDate = new Date(Date.now() - +callStartTime);

                const hours = talkTimeDate.getUTCHours() || '00';
                const minutes = talkTimeDate.getUTCMinutes() || '00';
                const secondes = talkTimeDate.getUTCSeconds() || '00';

                onTimerChange && onTimerChange(talkTimeDate.toUTCString().slice(17, 25))
            }, 1000)
            onAccepted && onAccepted()
            onTimerChange && onTimerChange('00:00:00')
        });

        this.session.on('failed', (data) => {
            console.error('Ошибка звонка', data);
            onFinished && onFinished()
            clearInterval(this.callTimerId)
        });

        this.session.on('ended', () => {
            console.log('Звонок завершен');
            onFinished && onFinished()
            clearInterval(this.callTimerId)
        });
    },
    hangUpCall() {
        this.session.terminate();
    }
}
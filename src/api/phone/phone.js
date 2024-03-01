import JsSIP from 'jssip';
import { RTCSession } from 'jssip/lib/RTCSession';
import { openPage } from '../../router/router';
import { chromeStorage } from "../../utils/isomorphicStorage";

/** @type {JsSIP.UA} */
export let ua;

export const phone = {
    /** @type {JsSIP.UA} */
    ua: null,
    /** @type {RTCSession} */
    session: null,
    server: null,
    callTimerId: null,
    login({ username, password, server, onRegistrationFailed, onRegistered }) {
        this.server = server;
        const socket = new JsSIP.WebSocketInterface(`wss://${server}`);
        const configuration = {
            sockets: [socket],
            uri: `sip:${username}@${server}`,
            password
        };
        this.ua = new JsSIP.UA(configuration);
        console.log(ua);
        this.ua.on('registrationFailed', (e) => {
            console.log('Registration failed', e);
            onRegistrationFailed && onRegistrationFailed();
        });

        this.ua.on('connected', () => {
            console.log('Connected');
        });

        this.ua.on('registered', () => {
            console.log('Registered');
            chromeStorage.setItem('auth', { username, password, server });
            openPage('dialer');
            onRegistered && onRegistered();

        });

        this.ua.on('disconnected', (e) => {
            console.log('disconnected', e);
        });
        this.ua.on('newRTCSession', (e) => {
            console.log('newRTCSession');
            this.session = e.session;
            console.log(this.session);

            if (this.session.direction === 'incoming') {
                this.session.connection && this.session.connection.addEventListener('addstream', (e) => {
                    this.remoteAudio.srcObject = e.stream;
                    this.remoteAudio.play();
                });
                const contact = this.session.local_identity.uri.user;
                openPage('incomingCall', contact);
            } else {
                this.session.connection.addEventListener('addstream', (e) => {
                    const audio = new window.Audio();
                    audio.srcObject = e.stream;
                    audio.play();
                });
            }
        });

        this.ua.start();
    },
    addToHistory(contact) {
        chromeStorage.getItem('callHistory').then((callHistory) => {
            if (!callHistory) {
                chromeStorage.setItem('callHistory', [{ number: contact }]);
            } else {
                chromeStorage.setItem('callHistory', [...callHistory, { number: contact }]);
            }
        })
    },
    sessionListenersHandler({ onFinished, onConnecting, onProgress, onAccepted, onTimerChange, contact }) {

        this.session.on('connecting', () => {
            console.log('Установление соединения...');
            onConnecting && onConnecting();
        });

        this.session.on('progress', () => {
            console.log('Прогресс звонка...');
            onProgress && onProgress();
        });


        this.session.on('accepted', () => {
            console.log('Звонок принят');

            this.callTimerId = setInterval(() => {
                const callStartTime = new Date(this.session.start_time);
                const talkTimeDate = new Date(Date.now() - +callStartTime);

                onTimerChange && onTimerChange(talkTimeDate.toUTCString().slice(17, 25))
            }, 1000)
            onAccepted && onAccepted();
            onTimerChange && onTimerChange('00:00:00');
        });

        this.session.on('failed', (data) => {
            console.error('Ошибка звонка', data);
            onFinished && onFinished(data.cause);
            clearInterval(this.callTimerId);
            this.addToHistory(contact);
        });

        this.session.on('ended', () => {
            console.log('Звонок завершен');
            onFinished && onFinished();
            clearInterval(this.callTimerId);
            this.addToHistory(contact);
        });
    },

    call(contact) {
        this.session = this.ua.call(`sip:${contact}@${this.server}`,
            {
                mediaConstraints: { audio: true, video: false },
                rtcOfferConstraints: { 'offerToReceiveAudio': true, 'offerToReceiveVideo': false }
            })
    },

    hangUpCall() {
        this.session && this.session.terminate();
    },

    answerCall() {
        if (this.session) {
            this.session.answer({
                mediaConstraints: { audio: true, video: false },
                rtcOfferConstraints: { 'offerToReceiveAudio': true, 'offerToReceiveVideo': false }
            });
            const isOutgoingCall = false;
            openPage('currentCall', this.session.local_identity.uri.user, isOutgoingCall)
        }
    }
}
import JsSIP from 'jssip';
import { RTCSession } from 'jssip/lib/RTCSession';
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
    finishSessionSubscribers: [],
    sessionListeners: {},
    login({ username, password, server, onRegistrationFailed, onRegistered, onIncomingCall }) {
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
            onRegistrationFailed && onRegistrationFailed();
        });

        this.ua.on('connected', () => {
            console.log('Connected');
        });

        this.ua.on('registered', () => {
            console.log('Registered');
            chromeStorage.setItem('auth', { username, password, server });
            onRegistered && onRegistered();

        });

        this.ua.on('disconnected', (e) => {
            console.log('disconnected', e);
        });
        this.ua.on('newRTCSession', (e) => {
            console.log('newRTCSession');
            this.session = e.session;
            if (this.session.direction === 'incoming') {
                const contact = this.session.local_identity.uri.user;
                onIncomingCall && onIncomingCall(contact)
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
    setFinishSessionSubscribers() {},
    clearSessionListeners() {
        Object.keys(this.sessionListeners).forEach((listenType) => {
            this.session?.off(listenType, this.sessionListeners[listenType]);
            delete this.sessionListeners[listenType];
        })
    },
    sessionFinishHandler({ onFinished, contact }) {
        this.clearSessionListeners();
        const onFailedListener = (data) => {  
            console.error('Ошибка звонка', data);
            onFinished && onFinished(data.cause);
            clearInterval(this.callTimerId);
            this.addToHistory(contact);
        }        
        const onEndedListener = (e) => {
            console.log('Звонок завершен');
            onFinished && onFinished();
            clearInterval(this.callTimerId);
            this.addToHistory(contact);
        }
        this.session.on('failed', onFailedListener);
        this.session.on('ended', onEndedListener);

        this.sessionListeners['failed'] = onFailedListener;
        this.sessionListeners['ended'] = onEndedListener;

        return { onFailedListener, onEndedListener }
    },
    sessionListenersHandler({ onFinished, onConnecting, onProgress, onAccepted, onTimerChange, contact }) {
        this.clearSessionListeners();
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

        this.sessionFinishHandler({ onFinished, contact });
    },

    call(contact) {
        this.session = this.ua.call(`sip:${contact}@${this.server}`,
            {
                mediaConstraints: { audio: true, video: false },
                rtcOfferConstraints: { 'offerToReceiveAudio': true, 'offerToReceiveVideo': false }
            });

        this.session.connection.addEventListener("addstream", (e) => {
            const audio = new window.Audio();
            audio.srcObject = e.stream;
            audio.play();
        });
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
            this.session.connection.addEventListener("addstream", (e) => {
                const audio = new window.Audio();
                audio.srcObject = e.stream;
                audio.play();
            });

            return this.session.local_identity.uri.user
        }
    }
}
import { create } from 'cypress/types/lodash';
import React, {createContext, useState, useEffect, useRef, MutableRefObject } from 'react';
import { InfobipRTC, CallOptions, Call, HangupStatus, IncomingCall, IncomingCallEvent} from 'infobip-rtc';

interface IContextProps{
    children: React.ReactNode;
}

interface ContextTypes{
    showCallModal?: boolean;
    showCallModalSet?: React.Dispatch<React.SetStateAction<boolean>>;
    localVideo?: MutableRefObject<HTMLVideoElement | null>;
    remoteVideo?: MutableRefObject<HTMLVideoElement | null>;
    startAudioCall?: (id: string) => void;
    answerAudioCall?: () => void;
}

const Context = createContext<ContextTypes>({});

const MyContext:React.FC<IContextProps> = ({children}) => {
    const [showCallModal, showCallModalSet] = useState(false);
    const [stream, streamSet] = useState<MediaStream | null>(null);

    const localVideo: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const remoteVideo: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const connectionRef:MutableRefObject<InfobipRTC | null> = useRef(null);
    const callRef:MutableRefObject<Call | null> = useRef(null);
    const incomingCallRef:MutableRefObject<IncomingCall | null> = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => streamSet(stream));
        console.log('useEffect');
        connect();
    }, [])
    

    const connect = () => {
        let infobipRTC = new InfobipRTC('string', { debug: true } );

        infobipRTC && (connectionRef.current = infobipRTC);
        
        connectionRef.current && connectionRef.current.connect();

        createConnectionEventListeners();
    }

    const disconnect = () => {
        connectionRef.current && connectionRef.current.disconnect();

        connectionRef.current && connectionRef.current.on('disconnected', function(event: string) {
            console.log('Disconnected!');
          });
    }

    const startAudioCall = (id: string) => {
        let callOptions = CallOptions.builder().setVideo(true).build();

        try {
            if(connectionRef.current){
                callRef.current = connectionRef.current.call(id, callOptions);
                createCallEventListeners();
            }
        } catch (error) {
            console.log(error);            
        }
    }

    const startVideoCall = (id: string) => {
        let callOptions = CallOptions.builder().setVideo(true).build();

        try {
            if(connectionRef.current){
                callRef.current = connectionRef.current.call(id, callOptions);
                createCallEventListeners();
            }
        } catch (error) {
            console.log(error);            
        }

    }

    const createConnectionEventListeners = () => {
        if(connectionRef && connectionRef.current){
            connectionRef.current.on('connected', function(event: {identity: string}) {
                console.log('Connected with identity: ' + event.identity);
    
                connectionRef.current!.on('incoming-call', function(incomingCallEvent: IncomingCallEvent) {
                    incomingCallRef.current = incomingCallEvent.incomingCall as IncomingCall;
                    console.log('Received incoming call from: ' + incomingCallRef.current.source().identity);
                     
                    incomingCallRef.current.on('established', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
                        localVideo.current!.srcObject = event.localStream;
                        remoteVideo.current!.srcObject = event.remoteStream;
                    });
                    incomingCallRef.current.on('hangup', function() {});
                 });
              });
        }
    }

    const createCallEventListeners = () => {
        if(callRef.current){
            callRef.current.on('ringing', function() {
                console.log('Call is ringing on johnny\'s device!');
              });

            callRef.current.on('established', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
                console.log('Alice answered call!');
                // localVideo.current!.srcObject = event.localStream;
                // remoteVideo.current!.srcObject = event.remoteStream;
          });

            callRef.current.on('hangup', (event: HangupStatus) => {
                hangUpCall(event);                
          });
        }
    }

    const answerAudioCall = () => {
        incomingCallRef.current && incomingCallRef.current.accept(); 
        console.log('Incoming call answered');        
    }

    const declineAudioCall = () => {
        incomingCallRef.current && incomingCallRef.current.decline();
        console.log('Incoming call declined'); 
    }

    const answerVideoCall = () => {}

    const hangUpCall = (event: HangupStatus) => {
        callRef.current && callRef.current.hangup();
        console.log(event);        
    }

  return (
    <Context.Provider value={{showCallModal, showCallModalSet, localVideo, remoteVideo, startAudioCall, answerAudioCall}}>
        {children}
    </Context.Provider>
  )
}

export {MyContext, Context}
import { create } from 'cypress/types/lodash';
import React, {createContext, useState, useEffect, useRef, MutableRefObject } from 'react';
import { InfobipRTC, CallOptions, Call, HangupStatus, IncomingCall, IncomingCallEvent, OutgoingCall} from 'infobip-rtc';
import {ConnectionStatus} from '../Help/ConnectionStatus';

interface IContextProps{
    children: React.ReactNode;
}

interface ContextTypes{
    connectionStatus?: ConnectionStatus;
    connect?: () => void;
    disconnect?: () => void;
    identity?: string;
    showCallModal?: boolean;
    showCallModalSet?: React.Dispatch<React.SetStateAction<boolean>>;
    callRinging?: boolean;
    callRingingSet?: React.Dispatch<React.SetStateAction<boolean>>;
    isLocalVideoCall?: boolean;
    isRemoteVideoCall?: boolean;
    localStream?: MutableRefObject<HTMLVideoElement | null>;
    remoteStream?: MutableRefObject<HTMLVideoElement | null>;
    incomingCallRef?: MutableRefObject<IncomingCall | null>;
    startAudioCall?: (id: string) => void;
    startVideoCall?: (id: string) => void;
    answerCall?: () => void;
    declineCall?: () => void;
    hangUpCall?: () => void;
    muteRemoteUser?: () => void;
    muteLocalUser?: () => void;
    toggleLocalVideo?: () => void;
    toggleRemoteVideo?: () => void;
    connectionRef?: MutableRefObject<InfobipRTC | null>;
}

const Context = createContext<ContextTypes>({});

const MyContext:React.FC<IContextProps> = ({children}) => {
    const [connectionStatus, connectionStatusSet] = useState(ConnectionStatus.disconnected);
    const [identity, identitySet] = useState('');
    const [showCallModal, showCallModalSet] = useState(false);
    const [stream, streamSet] = useState<MediaStream | null>(null);
    const [callRinging, callRingingSet] = useState(false);
    const [localUserMuted, localUserMutedSet] = useState(false);
    const [remoteUserMuted, remoteUserMutedSet] = useState(false);
    const [isLocalVideoCall, isLocalVideoCallSet] = useState(false);
    const [isRemoteVideoCall, isRemoteVideoCallSet] = useState(false);

    const localStream: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const remoteStream: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const connectionRef:MutableRefObject<InfobipRTC | null> = useRef(null);
    const callRef:MutableRefObject<Call | null> = useRef(null);
    const incomingCallRef:MutableRefObject<IncomingCall | null> = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => streamSet(stream));
        console.log('useEffect');
        connect();
    }, [])
    

    const connect = () => {
        let infobipRTC = new InfobipRTC('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHAiOiJhZjcxNmEzMi0xYzdiLTQ3N2MtOTAxMy0yODljNmE3YjM4NDMiLCJpZGVudGl0eSI6ImZyYW5jbyIsImlzcyI6IkluZm9iaXAiLCJuYW1lIjoiZnJhbmNvIiwibG9jYXRpb24iOiIiLCJleHAiOjE2NjA2MTExMzYsImNhcHMiOltdfQ.l5vGqdPaZS3ZKTAwNLUmKdl5RWtwydLA8Rz2hVJkMOw', { debug: true } );

        infobipRTC && (connectionRef.current = infobipRTC);
        
        connectionRef.current && connectionRef.current.connect();

        createConnectionEventListeners();
    }

    const disconnect = () => {
        console.log('disconnecting');
        
        connectionRef.current && connectionRef.current.disconnect();
    }

    const startAudioCall = (id: string) => {
        try {
            if(connectionRef.current){
                callRef.current = connectionRef.current.call(id);
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
                isLocalVideoCallSet(true);
            }
        } catch (error) {
            console.log(error);            
        }

    }

    const createConnectionEventListeners = () => {
        if(connectionRef && connectionRef.current){
            connectionRef.current.on('connected', function(event: {identity: string}) {
                console.log('Connected with identity: ' + event.identity);
                identitySet(event.identity);
                connectionStatusSet(ConnectionStatus.connected);
    
                connectionRef.current!.on('incoming-call', function(incomingCallEvent: IncomingCallEvent) {
                    incomingCallRef.current = incomingCallEvent.incomingCall as IncomingCall;
                    console.log('Received incoming call from: ' + incomingCallRef.current.source().identity);

                    callRingingSet(true);
                     
                    incomingCallRef.current.on('established', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
                        localStream.current!.srcObject = event.localStream;
                        remoteStream.current!.srcObject = event.remoteStream;

                        incomingCallRef.current!.hasLocalVideo() && isLocalVideoCallSet(true);
                        incomingCallRef.current!.hasRemoteVideo() && isRemoteVideoCallSet(true);
                    });
                    incomingCallRef.current.on('hangup', function() {
                        incomingCallRef.current && incomingCallRef.current.hangup();
                        showCallModalSet(false);
                        callRingingSet(false);
                    });
                    incomingCallRef.current.on('updated', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
                        localStream.current!.srcObject = event.localStream;
                        remoteStream.current!.srcObject = event.remoteStream;
        
                        incomingCallRef.current!.hasLocalVideo() && isLocalVideoCallSet(true);
                        incomingCallRef.current!.hasRemoteVideo() && isRemoteVideoCallSet(true);  
                    });
                 });
              });
        }
        connectionRef.current!.on('disconnected', function(event: {reason: string}){
            console.log('Disconnected');
            console.log(event);
            connectionStatusSet(ConnectionStatus.disconnected);                                
        });
        connectionRef.current!.on('reconnecting', function(){
            console.log('Reconnecting');
            connectionStatusSet(ConnectionStatus.reconnecting);
        });
        connectionRef.current!.on('reconnected', function(){
            console.log('Reconnected');
            connectionStatusSet(ConnectionStatus.reconnected);
        });
    }

    const createCallEventListeners = () => {
        if(callRef.current){
            callRef.current.on('ringing', function() {
                console.log('Call is ringing on johnny\'s device!');
              });

            callRef.current.on('established', function(event: {localStream: MediaStream, remoteStream: MediaStream}) {
                console.log('Alice answered call!');
                console.log(callRef.current);
                
                localStream.current!.srcObject = event.localStream;
                remoteStream.current!.srcObject = event.remoteStream;

                callRef.current!.hasLocalVideo() && isLocalVideoCallSet(true);
                callRef.current!.hasRemoteVideo() && isRemoteVideoCallSet(true);
          });

            callRef.current.on('hangup', (event: HangupStatus) => {
                console.log(event);
                callRef.current && callRef.current.hangup();
                showCallModalSet(false);               
          });

            callRef.current.on('updated', (event: {localStream: MediaStream, remoteStream: MediaStream}) => {
                localStream.current!.srcObject = event.localStream;
                remoteStream.current!.srcObject = event.remoteStream;

                callRef.current!.hasLocalVideo() && isLocalVideoCallSet(true);
                callRef.current!.hasRemoteVideo() && isRemoteVideoCallSet(true);         
      });
        }
    }

    const answerCall = () => {
        incomingCallRef.current && incomingCallRef.current.accept(); 
        console.log('Incoming call answered');        
    }

    const declineCall = () => {
        incomingCallRef.current && incomingCallRef.current.decline();
        console.log('Incoming call declined'); 
    }

    const hangUpCall = () => {
        incomingCallRef.current && incomingCallRef.current.hangup();
        callRef.current && callRef.current.hangup();
        //provjeriti dodatno
    }

    const muteRemoteUser = () => {
        if(!remoteUserMuted && incomingCallRef.current) {
            incomingCallRef.current.mute(true).catch((error:string) => console.log(error));
            remoteUserMutedSet(true);
            console.log('remote user muted');
            return;
        }

        incomingCallRef.current!.mute(false).catch((error:string) => console.log(error));
        remoteUserMutedSet(false);
    }
    
    const muteLocalUser = () => {
        if(!localUserMuted && callRef.current) {
            callRef.current.mute(true).catch((error:string) => console.log(error));
            localUserMutedSet(true);
            console.log('local user muted');
            return;
        }

        callRef.current!.mute(false).catch((error:string) => console.log(error));
        localUserMutedSet(false);
    }

    const toggleLocalVideo = () => {
        if(!isLocalVideoCall && callRef.current){
            isLocalVideoCallSet(true);
            callRef.current.localVideo(true).catch(error => console.log(error));
            console.log('local video toggled');            
            return;
        }
        isLocalVideoCallSet(false);
        callRef.current!.localVideo(false).catch(error => console.log(error));
    }

    const toggleRemoteVideo = () => {
        if(!isLocalVideoCall && incomingCallRef.current){
            isLocalVideoCallSet(true);
            incomingCallRef.current.localVideo(true).catch(error => console.log(error));
            console.log('remote video toggled');            
            return;
        }
        isLocalVideoCallSet(false);
        incomingCallRef.current!.localVideo(false).catch(error => console.log(error));
    }

  return (
    <Context.Provider value={{connectionStatus, connect, disconnect, identity, showCallModal, showCallModalSet, callRinging, callRingingSet, localStream, remoteStream, incomingCallRef, startAudioCall, answerCall, declineCall, startVideoCall, hangUpCall, muteRemoteUser, muteLocalUser, isLocalVideoCall, isRemoteVideoCall, toggleLocalVideo, toggleRemoteVideo, connectionRef}}>
        {children}
    </Context.Provider>
  )
}

export {MyContext, Context}
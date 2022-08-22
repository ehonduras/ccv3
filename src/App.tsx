import React, { useContext, useState, useRef, MutableRefObject, useEffect } from 'react';
import './App.css';
import ConnectionState from './components/connection/ConnectionState';
import { ConnectionStatus } from './help/ConnectionStatus';
import StartCallControls from './components/call_controls/StartCallControls';
import OutgoingCallComponent from './components/call/OutgoingCallComponent';
import IncomingCallComponent from './components/call/IncomingCallComponent';
import { InfobipRTC, IncomingCallEvent } from 'infobip-rtc';

function App() {
  const [connectionStatus, connectionStatusSet] = useState(ConnectionStatus.disconnected);
  const [isCallRinging, isCallRingingSet] = useState(false);
  const [identity, identitySet] = useState('');
  
  const connectionRef:MutableRefObject<InfobipRTC | null> = useRef(null);

  useEffect(() => {
    console.log('useEffect');
    connect();
  }, [])

  const connect = () => {
    let infobipRTC = new InfobipRTC('', { debug: true } );

    infobipRTC && (connectionRef.current = infobipRTC);
    
    connectionRef.current && connectionRef.current.connect();

    checkConnectionStatus();
  }

  const disconnect = () => {
      console.log('disconnecting');
      
      connectionRef.current && connectionRef.current.disconnect();
  }

  const checkConnectionStatus = () => {
    if(connectionRef && connectionRef.current){
      connectionRef.current.on('connected', function(event: {identity: string}){
        console.log('Connected with identity: ' + event.identity);
        identitySet(event.identity);
        connectionStatusSet(ConnectionStatus.connected);
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


  return (
    <div className="App">
        <ConnectionState connectionStatus={connectionStatus} disconnect={disconnect}/>

        <OutgoingCallComponent connectionRef={connectionRef} ></OutgoingCallComponent>

        <IncomingCallComponent identity={identity} isCallRinging={isCallRinging} connectionRef={connectionRef} isCallRingingSet={isCallRingingSet} ></IncomingCallComponent>
    </div>
  );
}

export default App;

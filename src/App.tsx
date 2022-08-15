import React, {useContext, useState} from 'react';
import './App.css';
import CallModal from './components/CallModal';
import InCallControls from './components/InCallControls';
import StartCallControls from './components/StartCallControls';
import ConnectionState from './components/ConnectionState';
import { Context } from './context/MyContext';

function App() {
  const {connectionStatus, showCallModal} = useContext(Context);

  return (
    <div className="App">
        { connectionStatus && <ConnectionState /> }

        { showCallModal ? <CallModal> <InCallControls /> </CallModal> : <StartCallControls />}
    </div>
  );
}

export default App;

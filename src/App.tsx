import React, {useContext, useState} from 'react';
import './App.css';
import CallModal from './components/CallModal';
import InCallControls from './components/InCallControls';
import StartCallControls from './components/StartCallControls';
import { MyContext, Context } from './context/MyContext';

function App() {
  const {showCallModal} = useContext(Context);

  return (
    <div className="App">
        {showCallModal ? <CallModal> <InCallControls /> </CallModal> : <StartCallControls />}
    </div>
  );
}

export default App;

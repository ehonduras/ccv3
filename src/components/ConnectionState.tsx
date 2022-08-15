import React, {useContext} from 'react';
import { Context } from '../context/MyContext';

const ConnectionState = () => {
    const {connectionStatus, connect, disconnect, showCallModal, connectionRef} = useContext(Context);

  return (
    <div className='connectionState'>
        <div className='connectContainer'>
            <p>Connection Status: </p>
            <p>{connectionStatus}</p>
        </div>
        
        <div className='connectContainer'>
            <p>Connect</p>
            <button>Connect</button>
        </div>
        <div className='connectContainer'>
            <p>Disconnect</p>
            <button onClick={disconnect}>Disconnect</button>
        </div>
        
    </div>
  )
}

export default ConnectionState
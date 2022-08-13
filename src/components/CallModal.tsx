import React, { useContext } from 'react';
import { MyContext, Context } from '../context/MyContext';
import InCallControls from './InCallControls';

interface IPropsCallModal{
  children: React.ReactNode;
}

const CallModal: React.FC<IPropsCallModal> = ({children}) => {
  const {localStream, remoteStream} = useContext(Context);

return (
    <div className='callModalContainer'>
      <div className='callPartiesContainer'>
        <div className='userCallItem'>
          <video playsInline autoPlay className='video' ref={localStream}/>
        </div>
        <div className='userCallItem'>
          <video playsInline autoPlay className='video' ref={remoteStream}/>
        </div>
      </div>
      {children}
    </ div>
  )
}

export default CallModal
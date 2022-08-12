import React, { useContext } from 'react';
import { MyContext, Context } from '../context/MyContext';
import InCallControls from './InCallControls';

interface IPropsCallModal{
  children: React.ReactNode;
}

const CallModal: React.FC<IPropsCallModal> = ({children}) => {
  const {localVideo, remoteVideo} = useContext(Context);

return (
    <div className='callModalContainer'>
      <div className='callPartiesContainer'>
        <div className='userCallItem'>
          <video playsInline muted autoPlay className='video' ref={localVideo}/>
        </div>
        <div className='userCallItem'>
          <video playsInline muted autoPlay className='video' ref={remoteVideo}/>
        </div>
      </div>
      {children}
    </ div>
  )
}

export default CallModal
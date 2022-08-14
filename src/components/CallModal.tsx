import React, { useContext } from 'react';
import { MyContext, Context } from '../context/MyContext';
import InCallControls from './InCallControls';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

interface IPropsCallModal{
  children: React.ReactNode;
}

const CallModal: React.FC<IPropsCallModal> = ({children}) => {
  const {localStream, remoteStream, isLocalVideoCall, isRemoteVideoCall} = useContext(Context);

return (
    <div className='callModalContainer'>
      <div className='callPartiesContainer'>
        <div className='userCallItem'>
          {
            <video playsInline autoPlay className='video' ref={localStream}/>
            // isLocalVideoCall ? <video playsInline autoPlay className='video' ref={localStream}/> : (
            //   <>
            //     <FontAwesomeIcon icon={faUser} size='5x'></FontAwesomeIcon>
            //     <audio autoPlay ref={localStream}></audio> 
            //   </>

            // )
          }
        </div>
        <div className='userCallItem'>
          {
            <video playsInline autoPlay className='video' ref={remoteStream}/> 
            // isRemoteVideoCall ? <video playsInline autoPlay className='video' ref={remoteStream}/> : (
            // <>
            //   <FontAwesomeIcon icon={faUser} size='5x'></FontAwesomeIcon>
            //   <audio autoPlay ref={remoteStream}></audio>
            // </>
            // )
          }
        </div>
      </div>
      {children}
    </ div>
  )
}

export default CallModal
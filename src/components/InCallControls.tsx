import React, { useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faVideoSlash} from '@fortawesome/free-solid-svg-icons';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { MyContext, Context } from '../context/MyContext';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const InCallControls = () => {
  const { showCallModalSet, hangUpCall, muteRemoteUser, muteLocalUser, incomingCallRef, toggleLocalVideo, toggleRemoteVideo } = useContext(Context);

  const handlePhoneSlash = () => {
    hangUpCall!();
    showCallModalSet!(false);
  }

  const handleMicrophoneSlash = (event: React.MouseEvent<SVGSVGElement>) => {
    if(incomingCallRef && incomingCallRef.current){
      muteRemoteUser!();
      return;
    }
    muteLocalUser!();
  }


  const handleVideoSlash = () => {
    if(incomingCallRef && incomingCallRef.current){
      toggleRemoteVideo!();
      return;
    }
    toggleLocalVideo!();
  }
  
  return (
    <div className='inCallControls'>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faMicrophoneSlash} color='whitesmoke' size='3x' className='icon' onClick={handleMicrophoneSlash}></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faVideoSlash} color='whitesmoke' size='3x' className='icon' onClick={handleVideoSlash}></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faPhoneSlash } color='red' size='3x' className='icon' onClick={handlePhoneSlash}></FontAwesomeIcon>
        </div>
    </div>
  )
}

export default InCallControls
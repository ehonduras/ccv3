import React, { useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faVideoCamera} from '@fortawesome/free-solid-svg-icons';
import { MyContext, Context } from '../context/MyContext';
import IncomingCallCont from './IncomingCallCont';

const Options = () => {
  const {callRinging, callRingingSet, showCallModalSet, startAudioCall, answerCall, startVideoCall} = useContext(Context);

  const handleAudioClick = () => {
    showCallModalSet!(true);
    startAudioCall!('franco');
  }

  const handleVideoClick = () => {
    showCallModalSet!(true);
    startVideoCall!('franco');
  }

  return (
    <div className='startCallControls'>
        {
          callRinging ? <IncomingCallCont /> : (
            <>
              <div className='iconContainer'>
                <FontAwesomeIcon icon={faPhone} color='whitesmoke' size='3x' className='icon' onClick={handleAudioClick}></FontAwesomeIcon>
              </div>
              <div className='iconContainer'>
                <FontAwesomeIcon icon={faVideoCamera} color='whitesmoke' size='3x' className='icon' onClick={handleVideoClick}></FontAwesomeIcon>
              </div>
            </>
          )
        }
        
    </div>
  )
}

export default Options
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faVideoSlash} from '@fortawesome/free-solid-svg-icons';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

interface IInCallControls{
  hangUpCall: () => void;
  muteUser: () => void;
  toggleVideo: () => void;
}

const InCallControls: React.FC<IInCallControls> = ({ hangUpCall, muteUser, toggleVideo }) => {

  const handlePhoneSlash = () => {
    hangUpCall();
  }
  
  const handleMicrophoneSlash = (event: React.MouseEvent<SVGSVGElement>) => {
    muteUser();
    console.log('usermuted');
  }

  const handleVideoSlash = () => {
    toggleVideo();
    console.log('video toggled');
  }
  
  return (
    <div className='inCallControls'>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faMicrophoneSlash} color='whitesmoke' size='1x' className='icon' onClick={handleMicrophoneSlash} ></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faVideoSlash} color='whitesmoke' size='1x' className='icon' onClick={handleVideoSlash} ></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faPhoneSlash } color='red' size='1x' className='icon' onClick={handlePhoneSlash} ></FontAwesomeIcon>
        </div>
    </div>
  )
}

export default InCallControls
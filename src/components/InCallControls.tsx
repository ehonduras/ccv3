import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faVideoSlash} from '@fortawesome/free-solid-svg-icons';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

const InCallControls = () => {
  return (
    <div className='inCallControls'>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faMicrophoneSlash} color='whitesmoke' size='3x' className='icon'></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faVideoSlash} color='whitesmoke' size='3x' className='icon'></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faPhoneSlash } color='red' size='3x' className='icon'></FontAwesomeIcon>
        </div>
    </div>
  )
}

export default InCallControls
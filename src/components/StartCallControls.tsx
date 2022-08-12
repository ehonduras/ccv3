import React, { useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faVideoCamera} from '@fortawesome/free-solid-svg-icons';
import { MyContext, Context } from '../context/MyContext';


const Options = () => {
  const {showCallModalSet, startAudioCall, answerAudioCall} = useContext(Context);

  const handleClick = () => {
    showCallModalSet!(true);
    startAudioCall!('franco');
  }

  const handleClickTwo = () => {
    showCallModalSet!(true);
    answerAudioCall!();
  }

  return (
    <div className='startCallControls'>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faPhone} color='whitesmoke' size='3x' className='icon' onClick={handleClick}></FontAwesomeIcon>
        </div>
        <div className='iconContainer'>
            <FontAwesomeIcon icon={faVideoCamera} color='whitesmoke' size='3x' className='icon'></FontAwesomeIcon>
        </div>
        <button onClick={handleClickTwo} name='answer'>Answer</button>
    </div>
  )
}

export default Options
import React, {useContext} from 'react';
import { Context } from '../context/MyContext';

const IncomingCall = () => {
  const { identity, callRingingSet, showCallModalSet, answerAudioCall } = useContext(Context);
   
  const handleAnswerClick = () => {
    callRingingSet!(false);
    showCallModalSet!(true);
    answerAudioCall!();
  }

  return (
    <div className='incomingCallContainer'>
        <p>{identity ? identity : 'Unknown person'} is calling you</p>
        <button onClick={handleAnswerClick}>Answer Call</button>
    </div>
  )
}

export default IncomingCall
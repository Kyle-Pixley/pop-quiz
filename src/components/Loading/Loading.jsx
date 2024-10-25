import React from 'react';
import StartGameButton from './StartGameButton/StartGameButton';
import './Loading.css';

function Loading({ quiz, setStartQuiz }) {

    

  return (
    <div id='loading-component'>
        <h1 id='lets-play-title' className='loading-titles'>Let's Play</h1>
        <h1 id='pop-quiz-title' className='loading-titles'>Pop Quiz</h1>
            <StartGameButton 
                quiz={quiz} 
                setStartQuiz={setStartQuiz}/>
    </div>
  )
}

export default Loading;
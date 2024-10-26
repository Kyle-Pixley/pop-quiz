import React, { useState } from 'react';
import LoadingBar from './LoadingBar/LoadingBar';
import './StartGameButton.css';

function StartGameButton({ quiz, setStartQuiz, fetchQuiz }) {

    const [ loadingBar, setLoadingBar ] = useState(true);

    const startQuiz = () => {
            fetchQuiz();
    };

    const disableLoadingBar = () => {
        setLoadingBar(false);
    }
    setTimeout(disableLoadingBar, 5100);


  return (
    <>
        {loadingBar ?
            <LoadingBar /> : 
            <button 
                id='start-quiz-button'
                className='start-quiz-button-spot'
                onClick={() => startQuiz()}>
                    Start Quiz
            </button> 
        }
    </>
  )
}

export default StartGameButton;
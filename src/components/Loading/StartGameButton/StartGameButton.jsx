import React from 'react';
import LoadingBar from './LoadingBar/LoadingBar';
import './StartGameButton.css';

function StartGameButton({ quiz, setStartQuiz, loadingBar }) {

    const startQuiz = () => {
        if(quiz) {
            setStartQuiz(true);
        }
    };

  return (
    <>
        {loadingBar ?
            <LoadingBar /> : 
            <button 
                id='start-quiz-button'
                className='start-quiz-button-spot'
                onClick={startQuiz}>
                    Start Quiz
            </button> 
        }
    </>
  )
}

export default StartGameButton;
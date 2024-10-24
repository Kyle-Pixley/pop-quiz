import React from 'react';
import './StartGameButton.css';

function StartGameButton({ quiz, setStartQuiz }) {

    const startQuiz = () => {
        if(quiz) {
            setStartQuiz(true);
        }
    };

  return (
    <>
    { quiz ? 
        <button 
            id='start-quiz-button'
            className='start-quiz-button-spot'
            onClick={startQuiz}>
                Start Quiz
        </button> 
        : 
        <div className='start-quiz-button-spot'></div>
    }
    </>
  )
}

export default StartGameButton;
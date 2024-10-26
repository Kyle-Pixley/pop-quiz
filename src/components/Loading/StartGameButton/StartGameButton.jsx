import React, { useState } from 'react';
import LoadingBar from './LoadingBar/LoadingBar';
import './StartGameButton.css';

function StartGameButton({ quiz, setStartQuiz, fetchQuiz }) {

    const [ loadingBar, setLoadingBar ] = useState(true);

// tied to button that starts the quiz by fetching the API call in App.jsx 
    const startQuiz = () => {
            fetchQuiz();
    };

// function that sets loading bar to false allowing the page to render the button that starts the quiz
    const disableLoadingBar = () => {
        setLoadingBar(false);
    }
// sets loading bar to false after 5.1 seconds 
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
import React from 'react';
import './GameOver.css';

function GameOver({ correctAnswers, setCorrectAnswers, setIsGameOver, setStartQuiz }) {

    const pluralQuestionCorrect = () => {
        if(correctAnswers > 1) {
            return "'s"
        }
    };

    const playAgain = () => {
        setCorrectAnswers(0);
        setIsGameOver(false);
        setStartQuiz(false);
    }
  return (
    <div id='game-over-container'>
        <h1 id='game-over-text'>You Got {correctAnswers} question{pluralQuestionCorrect()} correct! </h1>
        <button 
            id='play-again-button' 
            onClick={() => playAgain()}>Play Again?</button>
    </div>
  )
}

export default GameOver;
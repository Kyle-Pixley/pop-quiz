import React, { useState, useEffect } from 'react';
//'HE' is used to decode html entities/character references when they are in string format 
import he from 'he';
import './Question.css';

function Question({ quiz, setIsGameOver, correctAnswers, setCorrectAnswers }) {

  const [ questionNumber, setQuestionNumber ] = useState(0);
  const [ playerGuessed, setPlayerGuessed ] = useState(false);
  const [ shuffledAnswers, setShuffledAnswers ] = useState([]);
  const [ guessedZero, setGuessedZero ] = useState(false);
  const [ guessedOne, setGuessedOne ] = useState(false);
  const [ guessedTwo, setGuessedTwo ] = useState(false);
  const [ guessedThree, setGuessedThree ] = useState(false);

  useEffect(() => {
    const shuffled = shuffledArrayOfAnswers();
    setShuffledAnswers(shuffled);
  }, [questionNumber])

  const handleAnswer = (answer, number) => {
    setPlayerGuessed(true);

    if(number === 'zero'){
      setGuessedZero(true);
    } else if (number === 'one') {
      setGuessedOne(true);
    } else if (number === 'two') {
      setGuessedTwo(true);
    } else if (number === 'three') {
      setGuessedThree(true);
    }

    if(answer === quiz[questionNumber].correct_answer && playerGuessed === false){
      setCorrectAnswers(correctAnswers + 1);

    }
  };
  
  const handleGuessZeroColor = answer => {
    const isCorrectAnswer = answer === quiz[questionNumber].correct_answer;
    const anyGuessMade = guessedZero || guessedOne || guessedTwo || guessedThree;
      if(isCorrectAnswer && anyGuessMade) {
        return 'green'
      } else if(guessedZero && !isCorrectAnswer) {
        return 'red'
      } else return null
  };
  const handleGuessOneColor = answer => {
    const isCorrectAnswer = answer === quiz[questionNumber].correct_answer;
    const anyGuessMade = guessedZero || guessedOne || guessedTwo || guessedThree;
      if(isCorrectAnswer && anyGuessMade) {
        return 'green'
      } else if(guessedOne && !isCorrectAnswer){
        return 'red'
      } else return null
  };
  const handleGuessTwoColor = answer => {
    const isCorrectAnswer = answer === quiz[questionNumber].correct_answer;
    const anyGuessMade = guessedZero || guessedOne || guessedTwo || guessedThree;
      if(isCorrectAnswer && anyGuessMade) {
        return 'green'
      } else if(guessedTwo && !isCorrectAnswer) {
        return 'red'
      } else return null
  };
  const handleGuessThreeColor = answer => {
    const isCorrectAnswer = answer === quiz[questionNumber].correct_answer;
    const anyGuessMade = guessedZero || guessedOne || guessedTwo || guessedThree;
      if(isCorrectAnswer && anyGuessMade) {
        return 'green'
      } else if (guessedThree && !isCorrectAnswer) {
        return 'red'
      } else return null
  };
  const handleGuessTrue = answer => {
    const isCorrectAnswer = answer === quiz[questionNumber].correct_answer;
    const anyGuessMade = guessedZero || guessedOne || guessedTwo || guessedThree;
      if(isCorrectAnswer && anyGuessMade) {
        return 'green'
      } else if (guessedZero && !isCorrectAnswer) {
        return 'red'
      } else return null;
  }
  const handleGuessFalse = answer => {
    const isCorrectAnswer = answer === quiz[questionNumber].correct_answer;
    const anyGuessMade = guessedZero || guessedOne || guessedTwo || guessedThree;
      if(isCorrectAnswer && anyGuessMade) {
        return 'green'
      } else if (guessedOne && !isCorrectAnswer) {
        return 'red'
      } else return null;
  }

  const handleNextQuestion = () => {
    setGuessedZero(false);
    setGuessedOne(false);
    setGuessedTwo(false);
    setGuessedThree(false);
    if(questionNumber < 9) {
      setQuestionNumber(questionNumber + 1);
      setPlayerGuessed(false);
    } else {
      setQuestionNumber(0);
      setIsGameOver(true);
    }
  };

// shuffles the array of right and wrong answers to make it easier to make sure the correct answer is not always in the same spot on the page
  const shuffleArray = array => {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// organizes all the data of one right answer and three wrong answers to be put into shuffleArray()
  const shuffledArrayOfAnswers = () => {

    const wrongAnswerOne = he.decode(quiz[questionNumber].incorrect_answers[0] || "");
    const wrongAnswerTwo = he.decode(quiz[questionNumber].incorrect_answers[1] || "");
    const wrongAnswerThree = he.decode(quiz[questionNumber].incorrect_answers[2] || "");
    const correctAnswer = he.decode(quiz[questionNumber].correct_answer || "");
    
    const arrayOfAnswers = [wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, correctAnswer];
    return shuffleArray(arrayOfAnswers);
  }

// reads wether the question is multiple choice, or true or false based on the value of the type property
  const whatTypeOfQuestion = () => {
    if(quiz[questionNumber].type === 'multiple') {
      return(
        <div id='multiple-choice-answer-parent'>
          <div className='answer-group'>
            <button 
              onClick={() => handleAnswer(shuffledAnswers[0], 'zero')}
              className={`answer-buttons ${handleGuessZeroColor(shuffledAnswers[0])}`}
                >{shuffledAnswers[0]}</button>
            <button 
              onClick={() => handleAnswer(shuffledAnswers[1], 'one')}
              className={`answer-buttons ${handleGuessOneColor(shuffledAnswers[1])}`}
                >{shuffledAnswers[1]}</button>
          </div>
          <div className='answer-group'>
            <button
              onClick={() => handleAnswer(shuffledAnswers[2], 'two')}
              className={`answer-buttons ${handleGuessTwoColor(shuffledAnswers[2])}`}
                >{shuffledAnswers[2]}</button>
            <button 
              onClick={() => handleAnswer(shuffledAnswers[3], 'three')}
              className={`answer-buttons ${handleGuessThreeColor(shuffledAnswers[3])}`}
              >{shuffledAnswers[3]}</button>
          </div>

        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => handleAnswer('True', 'zero')}
            className={`answer-buttons boolean-answer-buttons ${handleGuessTrue('True')}`}>True</button>
          <button onClick={() => handleAnswer('False', 'one')}
            className={`answer-buttons boolean-answer-buttons ${handleGuessFalse('False')}`}>False</button>
        </div>
      )
    }
  }

// displays the current question based on what questionNumber the user is on also decodes the string coming from the data * see 'HE' package imported on this file 
  const currentQuestion = () => {
    const decodedQuestion = he.decode(quiz[questionNumber].question)
    return (
      <h2 id='current-question'>
        {decodedQuestion}
      </h2>)
  };

  return (

    <div id='question-container'>
        <h3 id='correct-answers'>Score: {correctAnswers}</h3>
        {currentQuestion()}
        {whatTypeOfQuestion()}
        {playerGuessed ? <button id='next-question-button' onClick={() => handleNextQuestion()}>Next</button> : <div id='next-question-button-placeholder'></div>}
    </div>
  )
}

export default Question;
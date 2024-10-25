import React, { useState } from 'react';
//'HE' is used to decode html entities/character references when they are in string format 
import he from 'he';
import './Question.css';

function Question({ quiz, setIsGameOver, correctAnswers, setCorrectAnswers }) {

  const [ questionNumber, setQuestionNumber ] = useState(0);

  //handles logic for when the answer the use gave is correct and add it to the score/correctAnswers, and handles logic when the user answered the final question 
  const handleAnswer = answer => {

    if(answer === quiz[questionNumber].correct_answer){
      setCorrectAnswers(correctAnswers + 1)
    }

    if(questionNumber < 9) {
      setQuestionNumber(questionNumber + 1)
    } else {
      setQuestionNumber(0);
      setIsGameOver(true);
    }
  }

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

    const wrongAnswerOne = he.decode(quiz[questionNumber].incorrect_answers[0])
    const wrongAnswerTwo = he.decode(quiz[questionNumber].incorrect_answers[1])
    const wrongAnswerThree = he.decode(quiz[questionNumber].incorrect_answers[2])
    const correctAnswer = he.decode(quiz[questionNumber].correct_answer)
    
    const arrayOfAnswers = [wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, correctAnswer];
    return shuffleArray(arrayOfAnswers);
  }

// reads wether the question is multiple choice, or true or false based on the value of the type property
  const whatTypeOfQuestion = () => {

    if(quiz[questionNumber].type === 'multiple') {

      const shuffledArray = shuffledArrayOfAnswers();

      return(
        <div id='multiple-choice-answer-parent'>
          <div className='answer-group'>
            <button onClick={() => handleAnswer(shuffledArray[0])}
              className='answer-buttons'>{shuffledArray[0]}</button>
            <button onClick={() => handleAnswer(shuffledArray[1])}
              className='answer-buttons'>{shuffledArray[1]}</button>
          </div>
          <div className='answer-group'>
            <button onClick={() => handleAnswer(shuffledArray[2])}
              className='answer-buttons'>{shuffledArray[2]}</button>
            <button onClick={() => handleAnswer(shuffledArray[3])}
              className='answer-buttons'>{shuffledArray[3]}</button>
          </div>

        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => handleAnswer('True')}
            className='answer-buttons boolean-answer-buttons'>True</button>
          <button onClick={() => handleAnswer('False')}
            className='answer-buttons boolean-answer-buttons'>False</button>
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
    </div>
  )
}

export default Question;
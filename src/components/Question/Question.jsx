import React, { useState } from 'react';
import './Question.css';

function Question({ quiz }) {

  const [ questionNumber, setQuestionNumber ] = useState(0);
  const [ correctAnswers, setCorrectAnswers ] = useState(0);

  const decodeSentenceSymbols = sentence => {
    const symbols = {
      '&quot;' : '"',
      '&#039;' : "'",
      '&rsquo;' : "'",
      '&ldquo;' : '"',
      '&rdquo;' : '"',
    };
    return sentence.replace(/&quot;|&#039;|&rsquo;|&ldquo;|&rdquo;/g, match => symbols[match])
  }

  const handleAnswer = answer => {

    if(answer === quiz[questionNumber].correct_answer){
      setCorrectAnswers(correctAnswers + 1)
    }

    if(questionNumber < 9) {
      setQuestionNumber(questionNumber + 1)
    } else {
      setQuestionNumber(0);
      setCorrectAnswers(0);
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
    const wrongAnswerOne = quiz[questionNumber].incorrect_answers[0]
      const wrongAnswerTwo = quiz[questionNumber].incorrect_answers[1]
      const wrongAnswerThree = quiz[questionNumber].incorrect_answers[2]
      const correctAnswer = quiz[questionNumber].correct_answer
      
      const arrayOfAnswers = [wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree, correctAnswer];
      console.log(arrayOfAnswers)

      return shuffleArray(arrayOfAnswers);
  }

  const whatTypeOfQuestion = () => {

    const shuffledArray = shuffledArrayOfAnswers();

    if(quiz[questionNumber].type === 'multiple') {
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
    } else if(quiz[questionNumber].type === 'boolean') {
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

  const currentQuestion = () => {
    const decodedQuestion = decodeSentenceSymbols(quiz[questionNumber].question)
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
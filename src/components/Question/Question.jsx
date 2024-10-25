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

  const shuffleArray = array => {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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
        <div>
          <button onClick={() => handleAnswer(shuffledArray[0])}>{shuffledArray[0]}</button>
          <button onClick={() => handleAnswer(shuffledArray[1])}>{shuffledArray[1]}</button>
          <button onClick={() => handleAnswer(shuffledArray[2])}>{shuffledArray[2]}</button>
          <button onClick={() => handleAnswer(shuffledArray[3])}>{shuffledArray[3]}</button>
        </div>
      )
    } else if(quiz[questionNumber].type === 'boolean') {
      return (
        <div>
          <button onClick={() => handleAnswer('True')}>True</button>
          <button onClick={() => handleAnswer('False')}>False</button>
        </div>
      )
    }
  }

  const currentQuestion = () => {
    const decodedQuestion = decodeSentenceSymbols(quiz[questionNumber].question)
    return (
      <h2>
        {decodedQuestion}
      </h2>)
  };

  return (

    <div>
        <h3>{correctAnswers}</h3>
        {currentQuestion()}
        {whatTypeOfQuestion()}
    </div>
  )
}

export default Question;
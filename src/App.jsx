import React, { useState, useEffect } from 'react';
import Question from './components/Question/Question.jsx';
import Loading from './components/Loading/Loading.jsx';
import GameOver from './components/GameOver/GameOver.jsx';
import './App.css';

function App() {

  const [ sessionToken, setSessionToken ] = useState('');
  const [ quiz, setQuiz ] = useState("");
  const [ startQuiz, setStartQuiz ] = useState(false);
  const [ correctAnswers, setCorrectAnswers ] = useState(0);
  const [ isGameOver, setIsGameOver ] = useState(false);
  const [ quizDifficulty, setQuizDifficulty ] = useState('');
  const [ quizCategory, setQuizCategory ] = useState('');

  // fetches the sessionToken from the API which is needed to make other request according to the documentation (https://opentdb.com/api_config.php) a session token is used to make sure the user never gets the same question twice
  useEffect(() => {
    fetch(`https://opentdb.com/api_token.php?command=request`)
      .then(res => res.json())
      .then(data => {
        setSessionToken(data.token)
      })
  }, [])

  // fetches the quiz data from the API and sets it to quiz useState 
  const fetchQuiz = () => {
    if(sessionToken) {
        fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&difficulty=${quizDifficulty}&category=${quizCategory}`)
        .then(res => res.json())
        .then(data => {
          if(data.response_code === 0) {
            setQuiz(data.results)
            setStartQuiz(true);
            console.log(quizDifficulty, quizCategory)
          }
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    if(quiz) {
      console.log(quiz)
    }
  },[quiz])

// returns what component is rendered to the user based on where they are in the story on page load the Loading screen is show to ensure API call are only made no more that once within a 5 second period and displays options for difficulty of questions and what category also it is the title screen
  const whatDisplay = () => {
    if (isGameOver) {
      return <GameOver 
              correctAnswers={correctAnswers}
              setCorrectAnswers={setCorrectAnswers}
              setStartQuiz={setStartQuiz}
              setIsGameOver={setIsGameOver}/>
    } else if (startQuiz) {
      return <Question 
              quiz={quiz} 
              setIsGameOver={setIsGameOver} 
              correctAnswers={correctAnswers} 
              setCorrectAnswers={setCorrectAnswers}/>
    } else return <Loading quiz={quiz} 
                    setStartQuiz={setStartQuiz} 
                    quizDifficulty={quizDifficulty}
                    setQuizDifficulty={setQuizDifficulty}
                    quizCategory={quizCategory}
                    setQuizCategory={setQuizCategory}
                    fetchQuiz={fetchQuiz}/>
  }

  return (
    <div id='app-component'>
      {whatDisplay()}
    </div>
  )
}

export default App;
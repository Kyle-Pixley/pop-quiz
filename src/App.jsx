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
  const [ loadingBar, setLoadingBar ] = useState(true);

  useEffect(() => {
    fetch(`https://opentdb.com/api_token.php?command=request`)
      .then(res => res.json())
      .then(data => {
        setSessionToken(data.token)
      })
  }, [])

  useEffect(() => {
    if(sessionToken) {
        fetchQuiz()
    }
  },[sessionToken])

  useEffect(() => {
    console.log(quizDifficulty)
  },[quizDifficulty])

  const fetchQuiz = () => {
    //todo move fetch to trigger on start quiz button click 
    const timer = setTimeout(() =>{
      fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&difficulty=${quizDifficulty}&category=${quizCategory}`)
        .then(res => res.json())
        .then(data => {
          if(data.response_code === 0) {
            setQuiz(data.results)
            setLoadingBar(false);
            console.log(quizDifficulty, quizCategory)
          }
        })
        .catch(err => console.log(err))
    }, 5001);
    return () => clearTimeout(timer);
    
  }

  //! here 
  useEffect(() => {
    if(quiz) {
      console.log(quiz)
    }
  },[quiz])

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
                    loadingBar={loadingBar}/>
  }

  return (
    <div id='app-component'>
      {whatDisplay()}
    </div>
  )
}

export default App;
import React, { useState, useEffect } from 'react';
import Question from './components/Question/Question.jsx';
import Loading from './components/Loading/Loading.jsx';
import './App.css';

function App() {

  const [ sessionToken, setSessionToken ] = useState('');
  const [ quiz, setQuiz ] = useState("");
  const [ startQuiz, setStartQuiz ] = useState(false);

  useEffect(() => {
    fetch(`https://opentdb.com/api_token.php?command=request`)
      .then(res => res.json())
      .then(data => {
        setSessionToken(data.token)
      })
  }, [])

  useEffect(() => {
    if(sessionToken) {
      const timer = setTimeout(() => {
        fetchQuiz()
      }, 5001);
      return () => clearTimeout(timer);
    }
  },[sessionToken])
  
  const fetchQuiz = () => {
    console.log("fetchQuiz")
    fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`)
    .then(res => res.json())
    .then(data => {
      if(data.response_code === 0) {
        setQuiz(data.results)
      }
    })
    .catch(err => console.log(err))
  }

  //! here 
  useEffect(() => {
    if(quiz) {
      console.log(quiz)
    }
  },[quiz])

  return (
    <div id='app-component'>
        {startQuiz 
            ? <Question quiz={quiz} /> 
            : <Loading 
                quiz={quiz}
                setStartQuiz={setStartQuiz} />}
    </div>
  )
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ sessionToken, setSessionToken ] = useState('');
  const [ quiz, setQuiz ] = useState("");

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
    console.log("useEffect")
    fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`)
    .then(res => res.json())
    .then(data => {
      if(data.response_code === 0) {
        setQuiz(data.results)
      }
    })
    .catch(err => console.log(err))
  }
 
  const displayQuestions = () => {
    if(quiz) {
      console.log(quiz)
    }
  }
  

  return (
    <>
      {displayQuestions()}
    </>
  )
}

export default App

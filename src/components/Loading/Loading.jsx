import React from 'react';
import StartGameButton from './StartGameButton/StartGameButton';
import './Loading.css';

function Loading({ quiz, setStartQuiz, quizDifficulty, setQuizDifficulty }) {

    

  return (
    <div id='loading-component'>
        <h1 id='lets-play-title' className='loading-titles'>Let's Play</h1>
        <h1 id='pop-quiz-title' className='loading-titles'>Pop Quiz</h1>
        <form id='quiz-options-form'>
            <div className='quiz-options'>
                <label>Difficulty</label>
                <select name='difficulty'>
                    <option>Mixed</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>
            <div className='quiz-options'>
                <label>Category</label>
                <select name='category'>
                    <option>Any Category</option>
                    <option>General Knowledge</option>
                    <option>Books</option>
                    <option>Film</option>
                    <option>Music</option>
                    <option>Musicals & Theatres</option>
                    <option>Television</option>
                    <option>Video Games</option>
                    <option>Board Games</option>
                    <option>Science & Nature</option>
                    <option>Computers</option>
                    <option>Mathematics</option>
                    <option>Mythology</option>
                    <option>Sports</option>
                    <option>Geography</option>
                    <option>History</option>
                    <option>Politics</option>
                    <option>Art</option>
                    <option>Celebrities</option>
                    <option>Animals</option>
                    <option>Vehicles</option>
                    <option>Comics</option>
                    <option>Gadgets</option>
                    <option>Japanese Anime & Manga</option>
                    <option>Cartoon & Animations</option>
                </select>
            </div>
        </form>
            <StartGameButton 
                quiz={quiz} 
                setStartQuiz={setStartQuiz}/>
    </div>
  )
}

export default Loading;
import React, {useEffect} from 'react';
import StartGameButton from './StartGameButton/StartGameButton';
import './Loading.css';

function Loading({ quiz, setStartQuiz, quizDifficulty, setQuizDifficulty, quizCategory, setQuizCategory, loadingBar }) {

    const handleQuizDifficultyChange = e => {
        setQuizDifficulty(e.target.value);
    }
    
    const handleQuizCategoryChange = e => {
        setQuizCategory(e.target.value);
    }


  return (
    <div id='loading-component'>
        <h1 id='lets-play-title' className='loading-titles'>Let's Play</h1>
        <h1 id='pop-quiz-title' className='loading-titles'>Pop Quiz</h1>
        <form id='quiz-options-form'>
            <div className='quiz-options'>
                <label>Difficulty</label>
                <select name='difficulty' 
                    value={quizDifficulty}
                    onChange={handleQuizDifficultyChange}>
                    <option value=''>Mixed</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
            </div>
            <div className='quiz-options'>
                <label>Category</label>
                <select name='category' 
                    onChange={handleQuizCategoryChange}>
                    <option value=''>Any Category</option>
                    <option value='9'>General Knowledge</option>
                    <option value='10'>Books</option>
                    <option value='11'>Film</option>
                    <option value='12'>Music</option>
                    <option value='13'>Musicals & Theatres</option>
                    <option value='14'>Television</option>
                    <option value='15'>Video Games</option>
                    <option value='16'>Board Games</option>
                    <option value='17'>Science & Nature</option>
                    <option value='18'>Computers</option>
                    <option value='19'>Mathematics</option>
                    <option value='20'>Mythology</option>
                    <option value='21'>Sports</option>
                    <option value='22'>Geography</option>
                    <option value='23'>History</option>
                    <option value='24'>Politics</option>
                    <option value='25'>Art</option>
                    <option value='26'>Celebrities</option>
                    <option value='27'>Animals</option>
                    <option value='28'>Vehicles</option>
                    <option value='29'>Comics</option>
                    <option value='30'>Gadgets</option>
                    <option value='31'>Japanese Anime & Manga</option>
                    <option value='32'>Cartoon & Animations</option>
                </select>
            </div>
        </form>
            <StartGameButton 
                quiz={quiz} 
                setStartQuiz={setStartQuiz}
                loadingBar={loadingBar}/>
    </div>
  )
}

export default Loading;
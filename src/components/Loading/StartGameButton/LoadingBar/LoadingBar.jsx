import React from 'react';
import './LoadingBar.css';

function LoadingBar() {
  return (
    <div id='loading-bar-container'>
        Gathering Questions...
        <div id='loading-bar'>
            <div id='loading-bar-filler'></div>
        </div>
    </div>
  )
}

export default LoadingBar;
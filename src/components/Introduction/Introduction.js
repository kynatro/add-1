import React from 'react';
import './Introduction.scss';

function beatsLabel(beats) {
  return beats === 1 ? 'beat' : 'beats';
}

export default ({ add, beatInput, beatInterval, beatWait, digitsAmount, handleStart }) => {
  const beatsPerSecond = beatInterval/1000;
  
  return (
    <div className="Introduction">
      <header>
        <h1>Add 1</h1>
      </header>

      <article>
        <p>Once you hit the "Start!" button below, a metronone timer will start beating at {beatsPerSecond} {beatsLabel(beatsPerSecond)}/second. You will be shown a {digitsAmount} digit number - say this number out loud, wait for {beatWait} {beatsLabel(beatWait)}, upon which the input field will be enabled and you will enter a new number based on the number shown with each digit incremented by {add}. You will have {beatInput} {beatsLabel(beatInterval)} to enter the incremented number before a new number is shown.</p>
        <p>A keyboard with a number pad is recommended.</p>
        
        <p><strong>Examples:</strong></p>
        <ul>
          <li><em>1234</em> increments to <em>2345</em></li>
          <li><em>7492</em> increments to <em>8501</em></li>
          <li><em>9103</em> increments to <em>0214</em></li>
        </ul>
      </article>

      <footer>
        <p><button onClick={handleStart}>Start!</button></p>
      </footer>
    </div>
  )
}
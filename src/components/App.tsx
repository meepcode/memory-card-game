import { useEffect, useState } from 'react'
import '../style/app.css'
import Game from './Game.tsx'

function App() {
  const [ numCards, setNumCards ] = useState(4);
  const [ numDisplay, setNumDisplay ] = useState(4);

  return (
    <div id='app'>
      {/*
        App Structure:
        
        <App>
          Information header
          Options (Number of Pokemon/Which Pokemon, number/layout of cards, high score)
          <Game>
            Score
            Rows of cards, can click on each to memorize it. clicking on one that's already been clicked on results in loss. Always make sure that at least one card that hasn't been clicked is displayed.
            display something when get all cards without clicking on one again.
          </game>
        </app>
      */}

      <div id='title'>
        <h1>Memory card game</h1>
        <p><strong>How to play:</strong> For each card that you click that you haven't clicked before, you get a point. If you click a card that you've already clicked, you lose. The goal is to click every card</p>
      </div>
      <form>
        <p>
          <label id='num-cards-label' htmlFor='num-cards'>
              Number of Cards:
          </label>
          <input 
            type='number' 
            min={2}
            max={151}
            id='num-cards' 
            aria-labelledby='num-cards-label' 
            onChange={(e) => setNumCards(e.target.valueAsNumber)} 
            value={numCards} 
          />
        </p>
        <p>
          <label id='num-display-label' htmlFor='num-display'>
              Number of Cards Displayed:
          </label>
          <input 
            type='number' 
            min={2}
            max={151}
            id='num-display' 
            aria-labelledby='num-display-label' 
            onChange={(e) => setNumDisplay(e.target.valueAsNumber)} 
            value={numDisplay} 
          />
        </p>

      </form>
      <Game numCards={numCards} numDisplay={numDisplay}/>
    </div>
  )
}

export default App

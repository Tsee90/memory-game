import { Card } from './Card';
import { useState } from 'react';
import '../styles/game.css';

export function Game() {
  const [deck, setDeck] = useState([
    'charizard',
    'venusaur',
    'blastoise',
    'mewtwo',
    'hitmonchan',
    'hitmonlee',
    'bellsprout',
    'flareon',
    'jolteon',
    'vaporeon',
    'pikachu',
    'haunter',
  ]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function shuffleDeck() {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const handleCardClick = (pokemon) => {
    if (!clickedPokemon.includes(pokemon)) {
      const newArr = [...clickedPokemon, pokemon];
      setClickedPokemon(newArr);
      const newCount = count + 1;
      setCount(newCount);
      const shuffledDeck = shuffleDeck();
      setDeck(shuffledDeck);
    } else {
      const newArr = [];
      const newCount = 0;
      if (count > highScore) {
        const newHighScore = count;
        setHighScore(newHighScore);
      }
      setClickedPokemon(newArr);
      setCount(newCount);
    }
  };

  return (
    <div className="game-container">
      <div className="header">
        <div className="title-container">
          <div className="title">Memory Game</div>
          <div className="subtitle">Don't click the same card twice!</div>
        </div>
        <div className="score-container">
          <div className="count">Count: {count}</div>
          <div className="highscore">Highscore: {highScore}</div>
        </div>
      </div>
      <div className="deck-container">
        {deck.map((pokemon) => {
          return (
            <Card
              key={pokemon}
              pokemon={pokemon}
              onClick={() => handleCardClick(pokemon)}
            />
          );
        })}
      </div>
    </div>
  );
}

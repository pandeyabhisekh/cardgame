import { useState } from 'react'
import './style.css';


const App = () => {
  const [username, setUsername] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [deck, setDeck] = useState(['Cat', 'Cat', 'Cat', 'Defuse', 'Exploding Kitten']);
  const [drawnCards, setDrawnCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState({});

  const handleStartGame = () => {
    if (username.trim() !== '') {
      setGameStarted(true);
    } else {
      alert('Please enter a username to start the game.');
    }
  };

  const handleDrawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];

    setDrawnCards([...drawnCards, drawnCard]);
    setDeck(deck.filter(card => card !== drawnCard));

    if (drawnCard === 'Exploding Kitten') {
      setGameOver(true);
      alert('Game Over! You drew an Exploding Kitten.');
    }

    if (deck.length === 0) {
      setGameOver(true);
      alert('Congratulations! You won the game.');
      updateLeaderboard();
    }
  };

  const updateLeaderboard = () => {
    setLeaderboard(prevState => ({
      ...prevState,
      [username]: (prevState[username] || 0) + 1
    }));
  };

  return (
    <div>
      {!gameStarted ? (
        <div>
          <input 
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleDrawCard}>Draw Card</button>
          <div>
            <h3>Drawn Cards:</h3>
            <ul>
              {drawnCards.map((card, index) => (
                <li key={index}>{card}</li>
              ))}
            </ul>
          </div>
          {gameOver && (
            <div>
              <h3>Leaderboard:</h3>
              <ul>
                {Object.keys(leaderboard).map((player, index) => (
                  <li key={index}>
                    {player}: {leaderboard[player]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

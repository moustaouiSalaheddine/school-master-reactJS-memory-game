import React, {useState, useEffect} from 'react';
import GameBoard from "./components/GameBoard";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import History from "./components/History";

function App() {
  const [cardCount, setCardCount] = useState(16);
  const [background, setBackground] = useState('#e0f7fa');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false)
  const [gameTime, setGameTime] = useState(0)
  const [games, setGames] = useState(JSON.parse(localStorage.getItem('games')) || [])
  const [score, setScore] = useState(0);

  useEffect(() => {
    if(finishedGame){
        const newGame = {
            score: score,
            time: gameTime,
            date: Date.now(),
        }
        const updateGames = [...games, newGame]
        setGames(updateGames)
        localStorage.setItem('games', JSON.stringify(updateGames))
        setFinishedGame(false);
    }
  }, [finishedGame, gameTime, score, games]);

    const handleOpenSettings = () => {
        setIsSettingsOpen(true);
    };

    const handleCloseSettings = () => {
        setIsSettingsOpen(false);
    };

    const handleOpenHistory = () => {
        setIsHistoryOpen(true);
    };

    const handleCloseHistory = () => {
        setIsHistoryOpen(false);
    }

    const handleCardChange = (count) => {
      setCardCount(count)
    }

    const handleBackgroundChange = (color) => {
      setBackground(color)
    }

    return (
    <div style={{ padding: '20px'}}>
       <h1>Memory Game</h1>
        <GameBoard
            setGameTime={setGameTime}
            setFinishedGame={setFinishedGame}
            cardCount={cardCount}
            background={background}
            setScore={setScore}
          />
        <Menu openSettings={handleOpenSettings} openHistory={handleOpenHistory} />
      {isSettingsOpen && <Settings cardCount={cardCount} background={background}  onCardChange={handleCardChange} onBackgroundChange={handleBackgroundChange} onClose={handleCloseSettings} />}
        {isHistoryOpen && <History games={games} onClose={handleCloseHistory}/>}
    </div>
  );
}

export default App;
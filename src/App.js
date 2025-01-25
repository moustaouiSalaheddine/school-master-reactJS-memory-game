import React, { useState, useEffect } from 'react';
import GameBoard from "./components/GameBoard";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import History from "./components/History";
import './index.css';

function App() {
    const [cardCount, setCardCount] = useState(16);
    const [background, setBackground] = useState('#fcc700');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [finishedGame, setFinishedGame] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [games, setGames] = useState(JSON.parse(localStorage.getItem('games')) || []);
    const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        if (finishedGame) {
            const newGame = {
                score: score,
                time: gameTime,
                date: Date.now(),
            };
            const updatedGames = [...games, newGame];
            setGames(updatedGames);
            localStorage.setItem('games', JSON.stringify(updatedGames));
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
    };

    const handleCardChange = (count) => {
        setCardCount(count);
    };

    const handleBackgroundChange = (color) => {
        setBackground(color);
    };
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: background,
            // fontFamily: 'Fredoka', sansSerif,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div style={{  width: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '10px'}}>
            <h1 style={{ textAlign: 'center'}}>Memory Game</h1>
            <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14pt', color: '#282A3A', fontWeight: 'bold' }}>
             <span>Moves: {score}</span>
            <span>Time : {gameTime} Sec</span>
        </div>
            <GameBoard cardCount={cardCount}  setFinishedGame={setFinishedGame} gameTime={gameTime} setGameTime={setGameTime} setScore={setScore} background={background} />
            <Menu gameStarted={gameStarted} openSettings={handleOpenSettings} openHistory={handleOpenHistory} />
          </div>
            {isSettingsOpen && (
                <Settings
                    cardCount={cardCount}
                    background={background}
                    onCardChange={handleCardChange}
                    onBackgroundChange={handleBackgroundChange}
                    onClose={handleCloseSettings}
                />
            )}
            {isHistoryOpen && <History games={games} onClose={handleCloseHistory} />}
        </div>
    );
}

export default App;
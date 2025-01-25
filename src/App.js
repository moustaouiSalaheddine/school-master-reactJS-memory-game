import React, { useState, useEffect } from 'react';
import GameBoard from "./components/GameBoard";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import History from "./components/History";
import './index.css';

function App() {
    const [cardCount, setCardCount] = useState(16);
    const [background, setBackground] = useState('#fcc700');
    const [backgroundStart, setBackgroundStart] = useState('#fcc700');
    const [backgroundEnd, setBackgroundEnd] = useState('#6f00fc'); 
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

    const handleBackgroundChangeStart = (color) => {
      setBackgroundStart(color);
    };
    const handleBackgroundChangeEnd = (color) => {
        setBackgroundEnd(color);
    };

    const formatTime = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      let formattedString = '';
        if(hours > 0){
          formattedString += `${hours} Hours `;
        }
        if(minutes > 0){
            formattedString += `${minutes} Minutes `;
        }
         formattedString += `${seconds} Seconds`;
      return formattedString;
    };
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
       background : `linear-gradient(135deg, ${backgroundEnd} 0%,#fc7900 50%,${backgroundStart} 100%)`
       }}>
        <div style={{
            // width: '100%',
            // height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div style={{  width: '100%', padding: '20px', borderRadius: '10px'}}>
            <h1 style={{ textAlign: 'center'}}>Memory Game</h1>
            <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14pt', color: '#282A3A', fontWeight: 'bold' }}>
             <span>Moves: {score}</span>
             <span>Time : {formatTime(gameTime)}</span>
            </div>
            <GameBoard cardCount={cardCount}  setFinishedGame={setFinishedGame} gameTime={gameTime} setGameTime={setGameTime} setScore={setScore} backgroundStart={backgroundStart} backgroundEnd={backgroundEnd}  />
            <Menu gameStarted={gameStarted} openSettings={handleOpenSettings} openHistory={handleOpenHistory} />
          </div>
            {isSettingsOpen && (
                <Settings
                    cardCount={cardCount}
                    backgroundStart={backgroundStart}
                    backgroundEnd={backgroundEnd}
                    onCardChange={handleCardChange}
                    onBackgroundChangeStart={handleBackgroundChangeStart}
                    onBackgroundChangeEnd={handleBackgroundChangeEnd}
                    onClose={handleCloseSettings}
                />
            )}
            {isHistoryOpen && <History games={games} onClose={handleCloseHistory} />}
        </div>
      </div>
    );
}

export default App;
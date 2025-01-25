 
import React from 'react';
const History = ({games, onClose}) => {
    const containerStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        zIndex: 1000,
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '10px'
    };

    const buttonStyle = {
      padding: '10px 20px',
      margin: '10px 0',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#3498db',
      color: 'white',
      cursor: 'pointer',
    };

    const itemStyle = {
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
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
        <div style={containerStyle}>
            <h3>Score History</h3>
            {games.length === 0 ? (<p>No Game History</p>) :
                games.map((game, index) => (
                    <div style={itemStyle} key={index}>
                      <p>Moves: {game?.score}, Time: {formatTime(game.time)}, Date: {new Date(game.date).toLocaleString()} </p>
                    </div>
                ))
            }
              <button style={buttonStyle} onClick={onClose}>Close</button>
        </div>
    )
}

export default History;
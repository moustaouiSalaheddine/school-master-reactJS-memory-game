import React from 'react';

const Menu = ({ openSettings, openHistory, gameStarted }) => {
    const menuStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        marginBottom: '20px',
    };
    const buttonStyle = {
        background: '#282A3A',
        color: '#FFF',
        borderRadius: '5px',
        padding: '10px 20px',
        border: '0',
        cursor: 'pointer',
        // fontFamily: 'Fredoka', cursive,
        fontSize: '18pt',
    };
    const disabledStyle = {
        color: '#757575'
    }
    return (
        <div style={menuStyle} className="controls">
            <button style={!gameStarted ? buttonStyle : {...buttonStyle, ...disabledStyle}} disabled={gameStarted} onClick={openSettings}>Settings</button>
            <button style={buttonStyle} onClick={openHistory}>History</button>
        </div>
    )
}

export default Menu;

import React from 'react';
const Menu = ({openSettings, openHistory}) => {
    const menuStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        marginTop: '20px'
    };
    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
    };
    return(
        <div style={menuStyle}>
            <button style={buttonStyle} onClick={openSettings}>Settings</button>
            <button style={buttonStyle} onClick={openHistory}>History</button>
        </div>
    )
}

export default Menu;
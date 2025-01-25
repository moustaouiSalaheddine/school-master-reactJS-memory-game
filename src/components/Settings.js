import React from 'react';

const Settings = ({onClose, onCardChange, onBackgroundChange, cardCount, background}) => {
    const settingsStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      zIndex: 1000,
      borderRadius: '10px'
    };

    const selectStyle = {
      margin: '10px 0',
      padding: '8px',
      border: '1px solid #ddd',
    };

    const backgroundStyle = {
      margin: '10px 0',
      padding: '8px',
      border: '1px solid #ddd',
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

    return(
        <div style={settingsStyle}>
            <h3>Settings</h3>
           <div>
            <label htmlFor="cardMode">Card Number :</label>
            <select value={cardCount} id="cardMode" style={selectStyle} onChange={(e) => onCardChange(Number(e.target.value))}>
                <option value={4}>4</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
            </select>
           </div>

            <div>
            <label htmlFor="background">Background Color : </label>
            <input style={backgroundStyle} type="color" value={background} id="background" onChange={(e) => onBackgroundChange(e.target.value)} />
            </div>

            <button style={buttonStyle} onClick={onClose}>Close</button>
        </div>
    )
}

export default Settings;
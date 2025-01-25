import React from 'react';

const Card = ({ card, onClick, flipped, matched }) => {
    const handleCardClick = () => {
        if (!flipped && !matched) {
            onClick(card.id);
        }
    };
    const cardStyle = {
        width: '100px',
        height: '150px',
        backgroundColor: flipped || matched ? '#ddd' : '#eee',
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2em',
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: matched ? 'none': 'auto',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'

    }
    return(
        <div style={cardStyle} onClick={handleCardClick}>
            {flipped || matched ? card.value : '?'}
        </div>
    )
}

export default Card
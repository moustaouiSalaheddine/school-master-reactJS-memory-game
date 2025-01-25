import React from 'react';

const Card = ({ card, onClick, flipped, matched }) => {
    const handleCardClick = () => {
      if(!flipped && !matched){
        onClick(card.id)
      }
    };
    const cardStyle = {
        position: 'relative',
        width: '100px',
        height: '100px',
        cursor: 'pointer',
    }
    const cardFrontStyle = {
      position: 'absolute',
      borderRadius: '5px',
      width: '100%',
      height: '100%',
      background: '#282A3A',
      transition: 'transform .6s cubic-bezier(0.4, 0.0, 0.2, 1)',
      backfaceVisibility: 'hidden',
      transform: flipped || matched ? 'rotateY(180deg) rotateZ(50deg)' : 'rotateY(0) rotateZ(0)',
    }
    const cardBackStyle = {
      position: 'absolute',
      borderRadius: '5px',
      width: '100%',
      height: '100%',
      background: '#FDF8E6',
        transition: 'transform .6s cubic-bezier(0.4, 0.0, 0.2, 1)',
      backfaceVisibility: 'hidden',
      transform: flipped || matched? 'rotateY(0) rotateZ(0)' : 'rotateY(180deg) rotateZ(50deg)',
      fontSize: '28pt',
      userSelect: 'none',
      textAlign: 'center',
      lineHeight: '100px',
    };

console.log("l40 flipped", flipped)
    return (
        <div style={cardStyle} className="card" onClick={handleCardClick}>
            <div style={cardFrontStyle} className="card-front"></div>
            <div style={cardBackStyle} className="card-back">{card.value}</div>
        </div>
    )
}

export default Card;
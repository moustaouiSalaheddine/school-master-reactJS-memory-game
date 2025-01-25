import React, { useState, useEffect, useRef } from 'react';
import Card from "./Card";

const GameBoard = ({cardCount, setFinishedGame, gameTime, setGameTime, setScore, background}) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [totalFlips, setTotalFlips] = useState(0);
    const [win, setWin] = useState(false)
    const startTime = useRef(null);

    useEffect(() => {
        if (cardCount === 4) {
            generateCards(2);
        } else if (cardCount === 16) {
            generateCards(8)
        } else {
            generateCards(16)
        }

    }, [cardCount]);

    useEffect(() => {
      if(cards.length > 0) {
        setGameStarted(true)
        startTime.current = new Date();
        setTotalFlips(0);
        setWin(false);
          setScore(0)
      }
    }, [cards, setScore])

    useEffect(() => {
      if(cards.length > 0 && matchedCards.length === cards.length){
        const endTime = new Date();
          setGameTime(Math.floor((endTime - startTime.current) / 1000));
        setFinishedGame(true);
        setWin(true);
      }
    }, [cards, matchedCards, setFinishedGame, setGameTime]);

    const generateCards = (numberOfPair) => {
        const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
        const picks = pickRandom(emojis, numberOfPair)
        const items = shuffle([...picks, ...picks])
        const cardData = items.map((item, index) => ({ id: index, value: item, key: index}))
        setCards(cardData)
        setMatchedCards([]);
        setFlippedCards([])
    }
  const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      const original = clonedArray[index]

      clonedArray[index] = clonedArray[randomIndex]
      clonedArray[randomIndex] = original
    }

    return clonedArray
  }
  const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
      const randomIndex = Math.floor(Math.random() * clonedArray.length)

      randomPicks.push(clonedArray[randomIndex])
      clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
  }

    const flipCard = (cardId) => {
       if(flippedCards.length === 2 || matchedCards.includes(cardId) || win){
        return;
      }

      setTotalFlips(prevFlip => prevFlip + 1)
      const newFlippedCards = [...flippedCards, cardId];
      setFlippedCards(newFlippedCards);
        setScore(prevScore => prevScore + 1)

       if(newFlippedCards.length === 2){
         const [card1, card2] = newFlippedCards;
         if(cards[card1].value === cards[card2].value){
           setTimeout(() => {
             setMatchedCards(prevMatched => [...prevMatched, card1, card2])
             setFlippedCards([]);
           }, 700)
         }else {
           setTimeout(() => {
             setFlippedCards([]);
           }, 700)
         }
       }

    }


    const boardStyle = {
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: cardCount === 32 ? 'repeat(8, auto)':  (cardCount === 16 ? 'repeat(4, auto)' : 'repeat(2, auto)'),
      gridGap: '20px',
      borderRadius: '5px',
      boxShadow: '0 25px 50px rgb(33 33 33 / 25%)',
    //   background: 'linear-gradient(135deg,  #6f00fc 0%,#fc7900 50%,#fcc700 100%)',
      backgroundColor: background,
      transition: 'transform .6s cubic-bezier(0.4, 0.0, 0.2, 1)',
      backfaceVisibility: 'hidden',
    }
    const winStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      textAlign: 'center',
      background: '#FDF8E6',
      transform: win ? 'rotateY(0) rotateZ(0)' : 'rotateY(180deg) rotateZ(50deg)',
      transition: 'transform .6s cubic-bezier(0.4, 0.0, 0.2, 1)',
      backfaceVisibility: 'hidden',
    }
  const boardContainerStyle = {
    position: 'relative'
  }


    return (
        <div style={boardContainerStyle} className={win ? 'flipped' : ''}>
           <div style={boardStyle} className="board">
            {gameStarted && cards.map(card => (
              <Card
                key={card.key}
                card={card}
                flipped={flippedCards.includes(card.id)}
                matched={matchedCards.includes(card.id)}
                onClick={flipCard}
              />
             ))}
           </div>
          {win && (
             <div style={winStyle} className="win">
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '21pt',
                color: '#282A3A',
              }} className="win-text">
                You won!<br />
                  with <span style={{ color: '#6f00fc'}} className="highlight">{totalFlips}</span> moves<br />
                under <span style={{ color: '#6f00fc'}} className="highlight">{gameTime}</span> seconds
              </span>
             </div>
           )}
        </div>
    )
}

export default GameBoard;
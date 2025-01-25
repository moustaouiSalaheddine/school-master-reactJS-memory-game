import React, {useState, useEffect, useRef} from 'react';
import Card from "./Card";

const GameBoard = ({ cardCount, setFinishedGame, setGameTime, background, setScore }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
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
        if(cards.length > 0){
            setGameStarted(true);
            startTime.current = new Date();
            setScore(0)
        }
        
    }, [cards, setScore])

    useEffect(() => {
        if(cards.length > 0 && matchedCards.length === cards.length){
            const endTime = new Date();
            setGameTime(Math.floor((endTime - startTime.current) / 1000));
            setFinishedGame(true);
        }
    }, [matchedCards, setFinishedGame, setGameTime, cards]);

    const generateCards = (numberOfPair) => {
        const cardPairs = [];
        for (let i = 1; i <= numberOfPair; i++) {
            cardPairs.push({id: i, value: i})
            cardPairs.push({id: i + numberOfPair, value: i})
        }

        const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5).map((card, index) => ({...card, id: index, key: index}))
        setCards(shuffledCards);
        setMatchedCards([])
        setFlippedCards([])
    };

    const handleCardClick = (cardId) => {
        if(flippedCards.length === 2 || matchedCards.includes(cardId)){
            return;
        }
        setScore(prevScore => prevScore + 1)
        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);


        if (newFlippedCards.length === 2) {
            const [card1, card2] = newFlippedCards;
            if (cards[card1].value === cards[card2].value) {
               setTimeout(() => {
                   setMatchedCards(prevMatched => [...prevMatched, card1, card2]);
                   setFlippedCards([])
               }, 700)
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 700)
            }
        }
    }

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: cardCount === 32 ? 'repeat(8, 1fr)':  (cardCount === 16 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'),
        gap: '10px',
        padding: '20px',
        backgroundColor: background,
        transition: 'background-color 0.5s ease',
        maxWidth: '800px',
        margin: '0 auto',
        border: '5px solid #ccc',
        borderRadius: '10px'
    }

    return(
        <div style={containerStyle}>
            {gameStarted && cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                flipped={flippedCards.includes(card.id)}
                matched={matchedCards.includes(card.id)}
                onClick={handleCardClick}
               />
            ))}
        </div>
    )
}

export default GameBoard
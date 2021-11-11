import { useState } from 'react';
import './App.css';
import { Card } from './Card';

export const initialCardState = [
    { value: 1 , visible: false },
    { value: 1 , visible: false },
    { value: 2 , visible: false },
    { value: 2 , visible: false },
    { value: 3 , visible: false },
    { value: 3 , visible: false },
    { value: 4 , visible: false },
    { value: 4 , visible: false },
    { value: 5 , visible: false },
    { value: 5 , visible: false },
    { value: 6 , visible: false },
    { value: 6 , visible: false },
]

function App() {
    const [score, setScore] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [started, setStarted] = useState(false);
    const [cards, setCards] = useState(initialCardState);

    const play = (position: number): void => {
        if (score % 2 === 1) {
            if (previous === cards[position].value) {
                setCards(cards.map((card, index) => {
                    if (index === position) {
                        return { ...card, visible: true };
                    }
                    return card;
                }))
            } else {
                setCards(cards.map(card => {
                    return { ...card, visible: false };
                }))
            }
        } else {
            setCards(cards.map((card, index) => {
                if (index === position) {
                    return { ...card, visible: true };
                }
                return card;
            }))
        }
        setScore(score + 1);
        setPrevious(cards[position].value);
    }

    return (
        <>
            {!started && <button onClick={() => setStarted(true)}>play</button>}
            
            {started && cards.map((card, position) => (
                <Card
                    key={position}
                    value={card.value}
                    visible={card.visible}
                    onClick={() => play(position)}
                />
            ))}
        </>
    );
}

export default App;

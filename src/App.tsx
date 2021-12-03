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
    const [history, setHistory] = useState<number[]>([]);
    const [started, setStarted] = useState(false);
    const [lock, setLock] = useState(false);
    const [cards, setCards] = useState(initialCardState);

    const play = (position: number): void => {
        if (cards[position].visible || lock) {
            return;
        }

        if (history.length % 2 === 1) {
            setCards(cards.map((card, index) => {
                if (index === position) {
                    return { ...card, visible: true };
                }
                return card;
            }))
            if (cards[history[history.length-1]].value !== cards[position].value) {
                setLock(true);
                setTimeout(() => {
                    setCards(cards.map((card, index) => {
                        if (index === position || index === history[history.length-1]) {
                            return { ...card, visible: false };
                        }
                        return card;
                    }));
                    setLock(false);
                }, 2000);
            }
        } else {
            setCards(cards.map((card, index) => {
                if (index === position) {
                    return { ...card, visible: true };
                }
                return card;
            }))
        }
        setHistory([...history, position]);
    }

    const isWin = () => {
        return cards.findIndex(card => !card.visible) === -1;
    }

    return (
        <>
            {!started && <button onClick={() => setStarted(true)}>play</button>}
            
            {started && (
                <div className="card-list">
                    {cards.map((card, position) => (
                        <Card
                            key={position}
                            value={card.value}
                            visible={card.visible}
                            onClick={() => play(position)}
                        />
                    ))}
                </div>
            )}

            {isWin() && (
                <>
                    <div>congratulation</div>
                    {<button onClick={() => {}}>play again</button>}
                </>
            )}
        </>
    );
}

export default App;

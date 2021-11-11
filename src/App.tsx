import { useState } from 'react';
import './App.css';
import { Card } from './Card';

function App() {
    const [started, setStarted] = useState(false);

    return (
        <>
            {!started && <button onClick={() => setStarted(true)}>play</button>}
            
            {started && (
                <>
                    <Card value={1} />
                    <Card value={1} />
                    <Card value={2} />
                    <Card value={2} />
                    <Card value={3} />
                    <Card value={3} />
                    <Card value={4} />
                    <Card value={4} />
                    <Card value={5} />
                    <Card value={5} />
                    <Card value={6} />
                    <Card value={6} />
                </>
            )}
        </>
    );
}

export default App;

import { useState } from 'react';
import './App.css';

function App() {
    const [started, setStarted] = useState(false);

    return (
        <>
            {!started && <button onClick={() => setStarted(true)}>play</button>}
            
            {started && (
                <>
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
        
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
        
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
        
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
                    <div data-testid="card"></div>
                </>
            )}
        </>
    );
}

export default App;

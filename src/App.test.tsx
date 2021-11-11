import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Memory card game', () => {

    beforeEach(() => {
        render(<App />);
    })
    
    it('should display a play button', () => {
        expect(screen.getByText('play')).toBeInTheDocument();
    });

    it('should display cards when start new game', () => {
        clickOnPlay();
        expect(screen.queryAllByTestId('card').length).toBeGreaterThan(0);
    });

    it('should not display cards before start new game', () => {
        expect(screen.queryByTestId('card')).toBeNull();
    });

    it('should not display play buton when game is started', () => {
        clickOnPlay();
        expect(screen.queryByText('play')).toBeNull();
    });

    describe('when the game is started', () => {

        beforeEach(() => {
            clickOnPlay();
        })

        it('should have only non visible cards', () => {
            expect(screen.queryAllByText('?').length).toEqual(12);
        })
    })

    const clickOnPlay = () => userEvent.click(screen.getByText('play'))
})

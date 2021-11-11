import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Memory card game', () => {
    
    it('should display a play button', () => {
        render(<App />);
        const linkElement = screen.getByText(/play/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('should display 12 non visible cards when start new game', () => {
        render(<App />);
        userEvent.click(screen.getByText('play'))
        expect(screen.getAllByTestId('card')).toHaveLength(12);
    });

    it('should not display 12 non visible cards before start new game', () => {
        render(<App />);
        expect(screen.queryByTestId('card')).toBeNull();
    });
})

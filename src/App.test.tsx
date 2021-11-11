import { render, screen } from '@testing-library/react';
import App from './App';

describe('Memory card game', () => {
    
    it('should display a play button', () => {
        render(<App />);
        const linkElement = screen.getByText(/play/i);
        expect(linkElement).toBeInTheDocument();
    });
})

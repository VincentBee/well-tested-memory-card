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
        expect(getAllCards().length).toBeGreaterThan(0);
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
            expectNotFoundCardCount().toEqual(12);
        })

        it('should make a card visible when click on it', async () => {
            clickOnCard(1);
            expectNotFoundCardCount().toEqual(11);
            expectFoundCardCount().toEqual(1);
        })

        it('should makes previous cards not visible when fail finding pair', () => {
            clickOnCard(1);
            clickOnCard(3);
            expectNotFoundCardCount().toEqual(12);
            expectFoundCardCount().toEqual(0);
        });
    })

    const clickOnPlay = () => userEvent.click(screen.getByText('play'))
    const clickOnCard = (position: number) => {
        const card = getAllCards()[position];
        expect(card).not.toBeNull();
        userEvent.click(card);
    }
    const expectFoundCardCount = () => expect(
        getAllCards().map(element => element.classList).filter(elementClasses => elementClasses.contains('visible')).length
        )
    const expectNotFoundCardCount = () => expect(
        getAllCards().map(element => element.classList).filter(elementClasses => !elementClasses.contains('visible')).length
    )
    const getAllCards = () => screen.queryAllByTestId('card');
})

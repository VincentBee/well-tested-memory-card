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

    it('should not display a congratulation mesage until we finish the game', () => {
        expect(screen.queryByText('congratulation')).toBeNull();
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
            clickOnCards([1, 3]);
            expectNotFoundCardCount().toEqual(12);
            expectFoundCardCount().toEqual(0);
        });

        it('should makes previous cards visible when succeed finding pair', () => {
            clickOnCards([1, 2]);
            expectNotFoundCardCount().toEqual(10);
            expectFoundCardCount().toEqual(2);
        });

        it('should keep validated card when fail finding an other pair', () => {
            clickOnCards([1, 2, 3, 5]);
            expectNotFoundCardCount().toEqual(10);
            expectFoundCardCount().toEqual(2);
        });

        it('should not be possible to click on visible card', () => {
            clickOnCards([1, 2, 3, 2]);
            expectNotFoundCardCount().toEqual(9);
            expectFoundCardCount().toEqual(3);
        });
    })

    describe('when finish the game', () => {

        beforeEach(() => {
            clickOnPlay();
            clickOnCards([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        });

        it('should display a congratulation mesage when finish the game', () => {
            expect(screen.getByText('congratulation')).toBeInTheDocument();
        });
    })

    const clickOnPlay = () => userEvent.click(screen.getByText('play'))
    const clickOnCard = (position: number) => {
        const card = getAllCards()[position - 1];
        expect(card).not.toBeNull();
        userEvent.click(card);
    }
    const clickOnCards = (positions: number[]) => {
        positions.forEach(position => clickOnCard(position))
    }
    const expectFoundCardCount = () => expect(
        getAllCards().map(element => element.classList).filter(elementClasses => elementClasses.contains('visible')).length
        )
    const expectNotFoundCardCount = () => expect(
        getAllCards().map(element => element.classList).filter(elementClasses => !elementClasses.contains('visible')).length
    )
    const getAllCards = () => screen.queryAllByTestId('card');
})

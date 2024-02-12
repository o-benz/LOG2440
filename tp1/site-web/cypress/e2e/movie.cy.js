import { testHeader, testFooter } from "./shared";
describe('Movie page', () => {

    beforeEach(() => {
        cy.visit('./src/movie.html');
    });

    testHeader();

    describe('Main content', () => {

        it('should contain a video element with controls', () => {
            cy.get('video').should('exist')
                .should('have.prop', 'controls');
        });

        it('should contain an image', () => {
            cy.get('img.movie-poster').should('exist');
        });

        it('should contain the information of the movie', () => {
            cy.get('#movie-title').contains('Cyborg');
            cy.get('#movie-description').contains('Il s\'agit d\'un film dans un univers futuriste');
            cy.get('#movie-actors').contains('Margerite Montaigne, Chantale Tremblay, Véronique Bélanger');
            cy.get('#movie-date').contains('21/08/2022');
            cy.get('#movie-duration').contains('2h30');
        });

        it('correspondance should be a different color from the rest', () => {
            cy.get('#movie-corr').then(el => {
                expect(el.css('background-color')).to.not.equal(el.css('color'));
            });
        });

    });

    testFooter();
});
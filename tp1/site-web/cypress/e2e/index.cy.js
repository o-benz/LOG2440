import { testHeader, testFooter } from "./shared";
describe('Main page', () => {

  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  testHeader();

  describe('Background', () => {
    it('Post container and body background colors should be different', () => {
      cy.get('.posters-container').then(el => {
        expect(el.css('background-color')).to.not.equal(getComputedStyle(document.body)['backgroundColor']);
      })
    })
  });

  describe('Main Content', () => {

    it('Page should have a  nouveautés header', () => {
      cy.get('h2').contains("Nouveautés");
    });

    it('Page should have a film icon next to nouveautés', () => {
      cy.get('i[class="fa-solid fa-film"]').should("exist");
    });

    it('Page should have a  vos recommandations header', () => {
      cy.get('h2').contains("Vos recommandations");
    });

    it('Page should have a heart icon next to recommandations', () => {
      cy.get('i[class="fa-solid fa-heart"]').should("exist");
    });

    it('Page should have 2 movies container, one for nouveautés and one for recommandations', () => {
      cy.get('div[class="posters-container"]').should("have.length", 2);
    });

    it('Page should contain 5 movies', () => {
      cy.get('.poster-container').should('have.length', 5);
    });

    it('Movie should have a redirection to movie page', () => {
      cy.get('#movie-1')
        .invoke('attr', 'href')
        .should('eq', 'movie.html');
    });

    it('Clicking on movie should redirect to movie page', () => {
      cy.get('#movie-1')
        .click();
      cy.url().should('include', 'movie.html');
    });
  });

  describe('Media Query', () => {
    it('Movies should be in 2 columns under 800px', () => {
      cy.viewport(799, 500);
      cy.get('.posters-container').invoke('css', 'grid-template-columns')
        .then((val) => expect(val.split(' ').length).to.eq(2));
    });
  });

  testFooter();


});
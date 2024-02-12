import { testHeader, testFooter } from "./shared";
describe('About page', () => {

  beforeEach(() => {
    cy.visit('./src/about.html');
  });

  testHeader();

  describe('About Page', () => {

    it('Page should contain a header and 3 paragaphs', () => {
      cy.get('h1').should('exist');
      cy.get('p').should('have.length', 3);
    });

    it('Page should contain a link to admin page', () => {
      cy.get('#admin-link')
        .click();
      cy.url().should('include', 'admin.html');
    });

    it('Page should contain a link to index page', () => {
      cy.get('#index-link')
        .click();
      cy.url().should('include', 'index.html');
    });

  });

  testFooter();
});
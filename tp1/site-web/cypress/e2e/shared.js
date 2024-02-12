export function testHeader() {
  describe('Header', () => {

    it('text and background should be different colors', () => {
      cy.get('header').then(el => {
        expect(el.css('background-color')).to.not.equal(el.css('color'));
      });
    });

    it('should contain a nav element with id \'nav-bar\'', () => {
      cy.get('nav').should('have.id', 'nav-bar');
    });

    it('should contain a nav element with 3 links', () => {
      cy.get('nav ul li a').should('have.length', 3);
    });

    it('nav element should contain correct links', () => {
      const EXPECTED_LINKS = ['./index.html', './admin.html', './about.html'];
      cy.get('nav ul li a').each((link, i) => {
        cy.wrap(link.attr('href')).should('eq', EXPECTED_LINKS[i]);
      });
    });

    it('header should contain a search form with a text input field', () => {
      cy.get('nav form#search-form')
        .should('exist')
        .find('input')
        .should('have.id', 'search-input')
        .type('Test message')
        .should('have.value', 'Test message');
    })
  });
}

export function testFooter() {
  describe('Footer', () => {
    it('Page should have a footer element', () => {
      cy.get('footer').should('exist');
    });

    it('Footer should have 2 student names with id student-1 and student-2', () => {
      const EXPECTED_ID = ['student-1', 'student-2'];
      cy.get('footer span').should('have.length', 2).each((el, i) => {
        cy.wrap(el).should('have.id', EXPECTED_ID[i]);
      })
    });

    it('Footer should be at the bottom of the page', () => {
      cy.get('footer')
        .should('have.css', 'position', 'absolute')
        .should('have.css', 'bottom', '0px');
    })
  });
}
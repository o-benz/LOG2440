import notes from "../fixtures/notes.json";

describe('Note details page', () => {
  beforeEach(() => {
    localStorage.setItem('notes', JSON.stringify([notes[0]]));
    cy.visit(`/detail.html?id=${notes[0].id}`);
  });

  it('Page should display note information', () => {
    cy.get('#note-content h2').should('contain', notes[0].title);
    cy.get('#note-content #tags').should('contain', notes[0].tags.join(', '));
    cy.get('#note-content textarea').should('contain', notes[0].content);
  });

  it('Page should allow to edit tags and content and save note', () => {
    cy.get('#note-content #tags').type('{selectall}{backspace}');
    cy.get('#note-content #tags').type('a,b  , , c,d');
    cy.get('#note-content textarea').type('{selectall}{backspace}');
    cy.get('#note-content textarea').type('Test Content');
    cy.get('#save-button').click();

    cy.url().should('contain', 'index.html');
    cy.get('#notes .note').eq(0).find('p').eq(0).should('contain', 'a, b, c, d');
  });
});

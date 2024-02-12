import notes from "../fixtures/notes.json";

describe('Note interaction', () => {
  beforeEach(() => {
    localStorage.setItem('notes', JSON.stringify([notes[0]]));
    cy.visit('/');
  });

  it('Delete button on note should delete the note', () => {
    cy.get('.note').click();
    cy.get('.delete-button').click();
    cy.get('.note').should('not.exist');
  });

  it('Details button on note should redirect to new page', () => {
    cy.get('.note').click();
    cy.get('.details-button').click();
    cy.url().should('contain', `detail.html?id=${notes[0].id}`);
  });

  it('Pin icon should change pin state', () => {
    cy.get('.note').click();
    cy.get('.pin').invoke('removeClass', 'hidden').click();
    cy.get('#pinned-notes .note').should('have.length', 1);
  });
});

import notes from "../fixtures/notes.json";

describe('Main page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Page should have no notes if storage is empty', () => {
    cy.visit('/');
    cy.get('.note').should('not.exist');
  });

  describe('Content tests', () => {
    beforeEach(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
      cy.visit('/');
    });

    it('Page should have some notes if localStorage is populated', () => {
      cy.get('.note').should('have.length', 3);
    });

    it('Page should have a single pinned note and 2 unpinned ones', () => {
      cy.get('#pinned-notes .note').should('have.length', 1);
      cy.get('#notes .note').should('have.length', 2);
    });

    it('Note should have correct data', () => {
      const pinnedNote = notes.find(x => x.pinned);
      cy.get('#pinned-notes .note')
        .invoke('attr', 'data-id')
        .should('eq', pinnedNote.id);
      cy.get('#pinned-notes .note h2').should('contain', pinnedNote.title);
    });

    it('Delete button should delete all notes', () => {
      cy.get("#delete-all-button").click();
      cy.get('.note').should('not.exist');
    });

    it('Create button should open the modal', () => {
      cy.get('#createNoteModal')
        .invoke('attr', 'open')
        .should('not.exist');
    });

    it('Filter by oldest date should order notes correctly', () => {
      cy.get('#sort-order').select('oldest');
      cy.get('#notes .note').eq(0).find('h2').should('contain', notes[2].title);
      cy.get('#notes .note').eq(1).find('h2').should('contain', notes[0].title);
    });

    it('Filter by newest date should order notes correctly', () => {
      cy.get('#sort-order').select('newest');
      cy.get('#notes .note').eq(0).find('h2').should('contain', notes[0].title);
      cy.get('#notes .note').eq(1).find('h2').should('contain', notes[2].title);
    });
  });
})

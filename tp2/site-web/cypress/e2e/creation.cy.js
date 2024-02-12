import notes from "../fixtures/notes.json";

describe('Create note tests', () => {
  beforeEach(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    cy.visit('/');
  });

  it('Create button should open the modal', () => {
    cy.get('#createNoteModal')
      .invoke('attr', 'open')
      .should('not.exist');
    cy.get('#createNoteButton').click();
    cy.get('#createNoteModal')
      .invoke('attr', 'open')
      .should('exist');
  });

  it('Creation modal can be filled and creates a new pinned note', () => {
    const testTitle = 'Test Note';
    const testColor = 'rgb(255, 0, 0)';
    cy.get('#createNoteButton').click();
    cy.get('#noteTitle').type(testTitle);
    cy.get('#noteContent').type('Test Content');
    cy.get('#noteTags').type('test1, test2, test3');
    cy.get('#noteColor')
      .invoke('val', testColor)
      .trigger('change');
    cy.get('#notePinned').click();
    cy.get('button[type=submit]').click();

    cy.get('#pinned-notes .note').should('have.length', 2);
    cy.get('#pinned-notes .note').should('have.css', 'background-color', testColor);
    cy.get('#pinned-notes .note').eq(1).find('h2').should('contain', testTitle);
  });

  it('Creation modal should trim tags', () => {
    const testTags = 'a, b,  c  ,,d';
    cy.get('#createNoteButton').click();
    cy.get('#noteTitle').type('Test Note');
    cy.get('#noteContent').type('Test Content');
    cy.get('#noteTags').type(testTags);
    cy.get('#notePinned').click();
    cy.get('button[type=submit]').click();

    cy.get('#pinned-notes .note').eq(1).find('p').eq(0).should('contain', 'a, b, c, d');
  });
});

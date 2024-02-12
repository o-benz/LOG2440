describe('Full e2e testing', () => {
  it('System should allow to create a new Note, go to its details and edit them', () => {
    localStorage.clear();
    cy.visit('/');

    // Create note
    cy.get('#createNoteButton').click();
    cy.get('#noteTitle').type('Test Note');
    cy.get('#noteContent').type('Test Content');
    cy.get('#noteTags').type('test1, test2, test3');
    cy.get('#notePinned').click();
    cy.get('button[type=submit]').click();

    // Test creation
    cy.get('#pinned-notes .note').should('have.length', 1);
    cy.get('#pinned-notes .note').eq(0).find('h2').should('contain', 'Test Note');

    // Link to details page
    cy.get('.note').click();
    cy.get('.details-button').click();
    cy.url().should('contain', `detail.html`);

    // Check details
    cy.get('#note-content h2').should('contain', 'Test Note');
    cy.get('#note-content #tags').should('contain', 'test1, test2, test3');
    cy.get('#note-content textarea').should('contain', 'Test Content');

    // Edit details and check main page
    cy.get('#note-content #tags').type('{selectall}{backspace}');
    cy.get('#note-content #tags').type('a,b,c,d');
    cy.get('#note-content textarea').type('{selectall}{backspace}');
    cy.get('#note-content textarea').type('Test Content');
    cy.get('#save-button').click();

    cy.url().should('contain', 'index.html');
    cy.get('#pinned-notes .note').eq(0).find('p').eq(0).should('contain', 'a, b, c, d');
  });
});

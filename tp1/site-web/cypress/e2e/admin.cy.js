import { testHeader, testFooter } from "./shared";
describe('Admin page', () => {

    beforeEach(() => {
        cy.visit('./src/admin.html');
    });

    testHeader();

    describe('Main content', () => {
        it('Page should contain a form for adding movies', () => {
            cy.get('form:not([id="search-form"])').should('exist');
        });

        it('Page should contain a label and input for the movie name', () => {
            cy.get('label[for="name"]').contains("Nom du film: ");
            cy.get('input[id="name"]').should('exist');
        });

        it('Page should contain a label and input for the movie description', () => {
            cy.get('label[for="description"]').contains("Description: ");
            cy.get('input[id="description"]').should('exist');
        });

        it('Page should contain a label and input with the type file for the movie image', () => {
            cy.get('label[for="image"]').contains("Image: ");
            cy.get('input[id="image"][type="file"]').should('exist');
        });

        it('Page should contain a label and input with the type file for the movie video', () => {
            cy.get('label[for="video"]').contains("Vidéo: ");
            cy.get('input[id="video"][type="file"]').should('exist');
        });

        it('Page should contain a label and input for the movie length', () => {
            cy.get('label[for="duration"]').contains("Durée (minutes): ");
            cy.get('input[type="number"]').should('exist');
        });

        it('Page should contain a label and input for the movie release date', () => {
            cy.get('label[for="release-date"]').contains("Date de sortie: ");
            cy.get('input[type="date"]').should('exist');
        });

        it('Page should contain a label and datalist input for the movie actors with an add actor button', () => {
            cy.get('datalist[id="actors-datalist"]').should('exist');
            cy.get('option[value="Margerite Montaigne"]').should('exist');
            cy.get('option[value="Chantale Tremblay"]').should('exist');
            cy.get('option[value="Véronique Bélanger"]').should('exist');
            cy.get('label[for="actor-input"]').contains("Act.eurs.rices: ");
            cy.get('input[id="actor-input"][type="select"][list="actors-datalist"]').should('exist');
            cy.get('button[class="fa fa-plus"]').should('exist');
        });

        it('Page should contain a submit button', () => {
            cy.get('input[type="submit"][value="Ajouter le film"]').should('exist');
        });

        describe('Form', () => {
            it('Incomplete form should not submit', () => {
                cy.get('#name').type('Test name');
                cy.get('#duration').type('123');
                cy.get('input[type="submit"]').click();
                cy.get('input:invalid').should('have.length', 4); // description, date, image, video
            });

            it('Complete form should submit', () => {
                cy.get('#name').type('Test name');
                cy.get('#description').type('Test description');
                cy.get('#duration').type(123);
                cy.get('#release-date').type('1999-12-31');
                cy.get('#image').selectFile('./src/assets/img/arizona.jpg');
                cy.get('#video').selectFile('./src/assets/mp4/video.mp4');
                cy.get('input[type="submit"]').click();
                cy.url().should('include', '?duration=123&release-date=1999-12-31');
            });

            it('All spaces in name should be invalid', () => {
                cy.get('#name').type('  ');
                cy.get('#name').invoke('prop', 'validity').should('deep.include', {
                    patternMismatch: true
                });
            });
        });


    });

    testFooter();
});
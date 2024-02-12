import { testFooter } from "./shared";
describe('Introduction test', () => {

    beforeEach(() => {
        cy.visit('./src/about.html');
    });

    testFooter();
});
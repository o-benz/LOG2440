// TODO : Récupérer les bons éléments des fichiers externes
import SERVER_URL from "./consts.js";
import HTTPManager from "./HTTPManager.js";
const httpManager = new HTTPManager(SERVER_URL);

const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const partnerFirstName = document.getElementById('first-name');
    const partnerLastName = document.getElementById('last-name');
    const partnerProgram = document.getElementById('program');
    const partnerSchool = document.getElementById('school');

    // TODO : Compléter la création de l'objet du partenaire

    const partner = {
        firstName: partnerFirstName.value,
        lastName: partnerLastName.value,
        program: partnerProgram.value,
        school: partnerSchool.value,
    };

    // TODO : Ajouter un nouveau partenaire à travers le serveur.
    // TODO : Rediriger l'utilisateur vers index.html en cas de réussite ou /error.html en cas d'échec
    try {
        const response = await httpManager.post(`/api/partner`, partner);
        if (response) {
            window.alert("L'étudiant avec le nom " + response.firstName + " a été créé !");
            window.location.href = '/index.html';
        }
    } catch (error) {
        alert("Échec de la création du partenaire ! - " + error.message);
        window.location.href = '/error.html';
    }
});

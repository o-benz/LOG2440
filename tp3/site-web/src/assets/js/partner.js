/* eslint-disable no-magic-numbers */
import HTTPManager from './HTTPManager.js';
import SERVER_URL from './consts.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const partnerId = urlParams.get('id');

const httpManager = new HTTPManager(SERVER_URL);

const submitButton = document.getElementById('submit-btn');
const deleteButton = document.getElementById('delete-btn');

// TODO : récupérer le partenaire à travers l'identifiant dans l'URL
const partner = await httpManager.get(`/api/partner/${partnerId}`);
if (partner) {
    document.getElementById('profile-firstName').textContent = partner.firstName;
    document.getElementById('profile-lastName').textContent = partner.lastName;
    document.getElementById('school').textContent = partner.school;
    document.getElementById('program').textContent = partner.program;
};

// TODO : récupérer les revues pour le partenaire à travers l'identifiant dans l'URL
const reviews = await httpManager.get(`/api/review/${partnerId}`);

if (reviews) {
    const reviewsContainer = document.getElementById('reviews-list');
    reviewsContainer.innerHTML = "";
    reviews.forEach(review => {
        reviewsContainer.appendChild(createReviewElement(review));
    });
};

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const rating = document.getElementById('rate');
    const comment = document.getElementById('comment');
    const author = document.getElementById('author');
    const review = {
        rating: rating.value,
        comment: comment.value,
        author: author.value,
        reviewedPartnerId: partnerId,
        date: new Date().toISOString().slice(0, 10)
    };

    // TODO : Ajouter une nouvelle revue sur le serveur
    // TODO : Rafraichir la page en cas de réussite ou rediriger l'utilisateur vers la page /error.html en cas d'échec
    try {
        console.log(review)
        const response = await httpManager.post(`/api/review`, review);
        if (response) {

            window.alert("Votre revue a été soumise !");
            window.location.reload();
        }
    } catch (error) {
        alert("Échec de la soumission de la revue !");
        window.location.href = 'error.html';
    }
});

deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // TODO : Supprimer toutes les revues pour le partenaire
    const response = await httpManager.delete(`/api/partner/${partnerId}`);
    if (response) {
        window.alert("L'étudiant a été supprimé !");
        window.location.href = "/index.html";
    } else {
        alert("Impossible de supprimer l'étudiant !");
    }
 });

function createReviewElement(review) {
    const parent = document.createElement('div');
    parent.classList.add('review-container');

    const rating = document.createElement('p');
    rating.classList.add('rating');
    rating.textContent = review.rating;
    parent.appendChild(rating);

    const author = document.createElement('p');
    rating.classList.add('author');
    author.textContent = review.author;
    parent.appendChild(author);

    const comment = document.createElement('p');
    comment.classList.add('comment');
    comment.textContent = review.comment;
    parent.appendChild(comment);

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = review.date;
    parent.appendChild(date);

    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = review.likes;
    parent.appendChild(likes);

    const likeBtn = document.createElement('button');
    likeBtn.textContent = '👍';

    // TODO : Envoyer une demande d'incrémentation des "like" de la revue et mettre à jour la vue avec la nouvelle valeur
    likeBtn.addEventListener('click', async (e) => { 
        e.preventDefault();
        const response = await httpManager.patch(`/api/review/${review.id}`);
        if(response){
            likes.textContent = response.likes;
        }

        
    });
    parent.appendChild(likeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    // TODO : Supprimer une revue et mettre à jour la vue
    deleteBtn.addEventListener('click', async (e) => {
        try{
            const response = await httpManager.delete(`/api/review/${review.id}`);
            if(response){
                parent.remove();
                window.location.reload();
                alert("La revue a été supprimée !");
            }
        } catch(error) {
            alert("Échec lors de la suppression de la revue ! - " + error.message);
        }
     });

    parent.appendChild(deleteBtn);

    return parent;
}

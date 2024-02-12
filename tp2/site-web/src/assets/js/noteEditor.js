import StorageManager from './storageManager.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteEditor {
  /**
   * TODO : configurer l'attribut de la classe
   * @param {StorageManager} storageManager gestionnaire du LocalStorage
   */
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  /**
   * Récupère l'attribut "id" à partir de l'URL de la page
   * @returns {string | null} l'identifiant de la note
   */
  getNoteIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  /**
   * TODO : Affiche les informations de la note en générant le HTML nécessaire.
   * Si l'id dans l'URL est invalide, affiche "La note demandée n'existe pas."
   * La note est récupéré du LocalStorage
   */
  displayNoteDetails() {
    const noteId = this.getNoteIdFromURL();
    const note = this.storageManager.getNoteById(noteId);

    const noteContent = document.getElementById('note-content');

    if (note){
      const titleElement = document.createElement('h2');
      titleElement.textContent = note.title;

      const lastEditElement = document.createElement('p');
      const lastEditDate = new Date(note.lastEdit);
      const formattedDate = `${lastEditDate.getMonth() + 1}/${lastEditDate.getDate()}/${lastEditDate.getFullYear()}`;
      lastEditElement.textContent = `Dernière modification: ${formattedDate}`;

      const tagsElement = document.createElement('p');
      tagsElement.id = 'tags';
      tagsElement.setAttribute("contentEditable", "true");
      tagsElement.textContent = `Tags: ${note.tags.join(', ')}`;

      const colorElement = document.createElement('p');
      const textColor = document.createElement('span');
      textColor.textContent = note.color;
      textColor.style.backgroundColor = note.color;
      colorElement.appendChild(document.createTextNode('Couleur : '));
      colorElement.appendChild(textColor);

      const pinElement = document.createElement('p');
      if(note.pin){pinElement.textContent = "Épinglée : Oui";}
      else{pinElement.textContent = "Épinglée : Non";}

      const contentText = document.createElement('p');
      contentText.textContent = "Contenu :";
      const contentElement = document.createElement('textarea');
      contentElement.id = 'content';
      contentElement.textContent = note.content;

      noteContent.appendChild(titleElement);
      noteContent.appendChild(lastEditElement);
      noteContent.appendChild(tagsElement);
      noteContent.appendChild(colorElement);
      noteContent.appendChild(pinElement);
      noteContent.appendChild(contentText);
      noteContent.appendChild(contentElement);
    } else {
      noteContent.textContent = "La note demandée n'existe pas.";
    }
  }

  /**
   * TODO : Modifie l'état épinglé de la note et la sauvegarde.
   * Modifie l'affichage de l'état épingé dans la page.
   */
  pin() {
    const noteId = this.getNoteIdFromURL();
    this.storageManager.pinById(noteId);
  }

  /**
   * TODO : Affiche une modale de confirmation.
   * Supprime la note si l'utilisateur confirme et redirige vers la page principale.
   */
  delete() {
    const noteId = this.getNoteIdFromURL();
    this.storageManager.deleteNote(noteId);
  }
}

/**
 * TODO : Ajoute un gestionnaire de click sur le bouton de sauvegarde.
 * Gère la modification de la note en fonction des éléments HTML modifiés dans la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 * @param {StorageManager} storageManager gestionnaire du LocalStorage
 */
function saveChangesByIdListener(noteEditor, storageManager) {
  const saveButton = document.getElementById('save-button');
  const contentElement = document.getElementById('content');
  const tagsElement = document.getElementById('tags');

  saveButton.addEventListener('click', () => {
    const noteId = noteEditor.getNoteIdFromURL();
    const tags = tagsElement.textContent.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const content = contentElement.value;
    storageManager.modifyNoteById(noteId, content, tags);
    window.location.href = 'index.html';
  });
}

/**
 * TODO : Ajoute un gestionnaire pour les événements de clavier pour les raccourcis "P" et "Delete".
 * Les raccourcis sont ignorés si les étiquettes ou le contenu ont le focus de la page.
 * @param {NoteEditor} noteEditor gestionnaire d'édition de la note
 */
function addKeyBoardEvents(noteEditor) {
}

window.onload = () => {
  const storageManager = new StorageManager();
  const noteEditor = new NoteEditor(storageManager);

  noteEditor.displayNoteDetails();

  saveChangesByIdListener(noteEditor, storageManager);
  addKeyBoardEvents(noteEditor);
}

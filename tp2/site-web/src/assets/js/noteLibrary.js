
/**
 * @typedef {import('./utils.js').Note} Note
 */

export default class NoteLibrary {
  noteList = document.getElementById('notes');
  pinnedNoteList = document.getElementById('pinned-notes');
  ascendingValueComparer = 'newest';
  selectedNote = null;

  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  /**
   * TODO : Génère le code HTML pour une note à afficher à l'écran.
   * Ajoute les gestionnaires de click pour les icônes d'épingle, suppression et détails.
   * Ajoute un gestionnaire de click global sur l'élément pour sélectionner/désélectionner la note
   * @param {Note} note note à afficher
   * @returns {HTMLDivElement} élément div parent de l'affichage pour la note
   */
  createHTMLNote(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.setAttribute('data-id', note.id);
    noteDiv.style.backgroundColor = note.color;

    const pinnedIconSpace = document.createElement('div');
    pinnedIconSpace.id = 'pinned-icon-spaces';
    noteDiv.appendChild(pinnedIconSpace);

    const titleElement = document.createElement('h2');
    titleElement.textContent = note.title;
    pinnedIconSpace.appendChild(titleElement);

    const pinIcon = document.createElement('i');
    pinIcon.classList.add('fa', 'fa-paperclip', 'pin', 'hidden');
    pinIcon.style.color = 'white';
    pinnedIconSpace.appendChild(pinIcon);

    noteDiv.appendChild(pinnedIconSpace);

    const tagsElement = document.createElement('p');
    tagsElement.textContent = `Tags: ${note.tags.join(', ')}`;
    noteDiv.appendChild(tagsElement);

    const lastEditElement = document.createElement('p');
    lastEditElement.classList.add('date');
    // On veut changer le format de la date à "M/D/YYYY"
    const lastEditDate = new Date(note.lastEdit);
    const formattedDate = `${lastEditDate.getMonth() + 1}/${lastEditDate.getDate()}/${lastEditDate.getFullYear()}`;
    lastEditElement.textContent = `Dernière modification: ${formattedDate}`;
    noteDiv.appendChild(lastEditElement);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('delete-button', 'fa', 'fa-trash-o', 'hidden');
    noteDiv.appendChild(deleteIcon);

    const detailsIcon = document.createElement('i');
    detailsIcon.classList.add('details-button', 'fa', 'fa-info', 'hidden');
    noteDiv.appendChild(detailsIcon);

    pinIcon.addEventListener('click', () => {
      this.pinNote(note.id);
    });

    deleteIcon.addEventListener('click', () => {
      this.deleteNote(note.id);
    });

    detailsIcon.addEventListener('click', () => {
      window.location.href = `detail.html?id=${note.id}`;
    });

    noteDiv.addEventListener('click', () => {
      this.selectNote({ deleteIcon, detailsIcon });
      this.selectedNote = deleteIcon.parentElement;
    });

    return noteDiv;
  }

  /**
   * Ajoute ou retire la classe 'hidden' aux éléments
   * @param {{deleteIcon: HTMLElement, detailsIcon: HTMLElement}} noteNodeElements contient les icônes de suppression et détails
   *
  */
  selectNote(noteNodeElements) {
    noteNodeElements.deleteIcon.classList.toggle('hidden');
    noteNodeElements.detailsIcon.classList.toggle('hidden');
  }

  /**
   * TODO : Génère le HTML pour toutes les notes dans les 2 listes en fonction de l'attribut "pinned" de chaque note.
   * TODO : Vous NE POUVEZ PAS utiliser une boucle for() classique pour cette fonction
   * @param {Array<Note>} notes notes à afficher dans la page
   */
  generateHTMLNotes(notes) {
    const pinnedNotes = notes.filter(note => note.pinned);
    const unpinnedNotes = notes.filter(note => !note.pinned);

    pinnedNotes.forEach(note => {
      this.addNoteToList(note, this.pinnedNoteList);
    });

    unpinnedNotes.forEach(note => {
      this.addNoteToList(note, this.noteList);
    });
  }

  /**
   * TODO : Met à jour les listes des notes affichées dans la page
   * @param {Array<Note>} notes notes à afficher dans la page
   */
  updateListsInterface(notes) {
    this.noteList.innerHTML = '';
    this.pinnedNoteList.innerHTML = '';
    this.generateHTMLNotes(notes);
  }

  /**
   * TODO : Ajoute une note à une des listes.
   * La note est ajoutée au début ou à la fin de la liste en fonction de l'option de tri choisie dans la page
   * @param {Note} note note à ajouter
   * @param {HTMLElement} listElement liste (Notes Épinglées ou Notes) à modifier
   */
  addNoteToList(note, listElement) {
    // this.storageManager.addNote(note);
    const noteDiv = this.createHTMLNote(note);
    if (this.ascendingValueComparer === 'newest') {
      listElement.insertBefore(noteDiv, listElement.firstChild);
    } else if (this.ascendingValueComparer === 'oldest') {
      listElement.appendChild(noteDiv);
    }
  }

  /**
   * TODO : Supprime une note en fonction de son ID et met à jour la vue
   * @param {string} id identifiant de la note
   */
  deleteNote(id) {
    this.storageManager.deleteNoteById(id);
    const updatedNotes = this.storageManager.getNotes();
    this.updateListsInterface(updatedNotes);
  }

  /**
   * TODO : Modifie l'état épinglé de la note en fonction de son ID et met à jour la vue
   * @param {string} id identifiant de la note
   */
  pinNote(id) {
    this.storageManager.pinById(id);
    const updatedNotes = this.storageManager.getNotes();
    this.updateListsInterface(updatedNotes);
  }

  /**
   * TODO : Supprime toutes les notes du site et met à jour la vue
   */
  deleteAll() {
    this.storageManager.deleteAllNotes();
    const updatedNotes = this.storageManager.getNotes();
    this.updateListsInterface(updatedNotes);
  }
}

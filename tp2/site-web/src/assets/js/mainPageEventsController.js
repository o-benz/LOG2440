
import { createNoteObject } from './utils.js';

/**
 * @typedef {import('./utils.js').Note} Note
 */
export default class MainPageEventsController {
  constructor(noteLibrary) {
    this.noteLibrary = noteLibrary;
  }

  /**
   * TODO : Ouvre la modale du formulaire de création
   */
  openModalListener() {
    const createNoteButton = document.getElementById('createNoteButton');
    const modal = document.getElementById('createNoteModal');
    createNoteButton.addEventListener('click', () => {
      modal.style.display = 'block';
      modal.setAttribute('open', 'true');
    });
  }

  /**
   * TODO : Ferme la modale du formulaire de création
   */
  closeModalListener() {
    const closeButton = document.getElementById('closeModal');
    const modal = document.getElementById('createNoteModal');
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.setAttribute('open', 'false');
    });
  }

  /**
   * TODO : Gère l'événement de la soumission du formulaire.
   * Sauvegarde la nouvelle note et met à jour le rendu de la page
   */
  submitListener() {
    const noteForm = document.getElementById('noteForm');
    noteForm.addEventListener('submit', () => {
      const newNote = this.getNoteDetailsFromModal();
      const notes = this.noteLibrary.storageManager.getNotes();
      this.noteLibrary.storageManager.addNote(newNote);
      this.noteLibrary.addNoteToList(newNote, this.noteLibrary.noteList);
      this.noteLibrary.updateListsInterface(notes);
      const modal = document.getElementById('createNoteModal');
      modal.style.display = 'none';
      modal.setAttribute('open', 'false');
    });
  }

  /**
   * TODO : Récupère les informations du formulaire et génère un objet Note
   * @returns {Note} la note définie dans le formulaire
   */
  getNoteDetailsFromModal() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const tagsInput = document.getElementById('noteTags').value;
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const color = document.getElementById('noteColor').value;
    const pinned = document.getElementById('notePinned').checked;
    return createNoteObject(title, content, tags, color, pinned);
  }

  /**
   * TODO : Trie les notes dans la page en fonction de l'option choisie dans le menu déroulant
   */
  sortListener() {
    const sortOrderSelect = document.getElementById('sort-order');

    sortOrderSelect.addEventListener('change', () => {
      const selectedSortOrder = sortOrderSelect.value;
      const notes = this.noteLibrary.storageManager.getNotes();
      const sortComparer = 'oldest';
      if (sortComparer === selectedSortOrder) {
        notes.sort((note, note2) => { return Date.parse(note2.lastEdit) - Date.parse(note.lastEdit) });
      } else {
        notes.sort((note, note2) => { return Date.parse(note.lastEdit) - Date.parse(note2.lastEdit) });
      }
      this.noteLibrary.updateListsInterface(notes)
    });
  }

  /**
   * TODO : Gère l'événement de click pour la suppression de toutes les notes
   */
  deleteAllListener() {
    const deleteAllButton = document.getElementById('delete-all-button');
    deleteAllButton.addEventListener('click', () => {
      this.noteLibrary.deleteAll();
    });
  }

  /**
   * TODO : Gère les événements de clavier pour les raccourcis "P" et "Delete"
   * Les événements sont ignorés s'il n'y a pas de note sélectionnée
   */
  addKeyBoardEvents() {
    document.addEventListener('keydown', (event) => {
      if (this.noteLibrary.selectedNote) {
        if (event.key === 'p' || event.key === 'P') {
          this.noteLibrary.pinNote(this.noteLibrary.selectedNote.getAttribute('data-id'));
        } else if (event.key === 'Delete') {
          this.noteLibrary.deleteNote(this.noteLibrary.selectedNote.getAttribute('data-id'));
        }
      }
    });
  }

  /**
   * TODO : Configure la gestion de la modale et formulaire de création
   */
  manageModal() {
    this.openModalListener();
    this.closeModalListener();
    this.submitListener();
  }

  listenToAllEvents() {
    this.manageModal();
    this.addKeyBoardEvents();
    this.deleteAllListener();
    this.sortListener();
  }
}

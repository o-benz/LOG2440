import notes from './defaultData.js';

export default class StorageManager {
  STORAGE_KEY_NOTES = 'notes';

  populate() {
    if (!this.getNotes() || this.getNotes().length === 0) {
      localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notes));
    }
  }

  getNotes() {
    // TODO : Récupérer les notes du Local Storage et les renvoyer sous forme de tableau d'objets Note
    const storedNotes = localStorage.getItem(this.STORAGE_KEY_NOTES);
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  getNoteById(id) {
    // TODO : Récupérer une note en fonction de son ID et la renvoyer
    const notes = this.getNotes();
    return notes.find(note => note.id === id);
  }

  setNotes(notesArray) {
    // TODO : Enregistrer un tableau de notes dans le Local Storage
    localStorage.setItem(this.STORAGE_KEY_NOTES, JSON.stringify(notesArray));
  }

  addNote(note) {
    // TODO : Ajouter une nouvelle note au tableau existant et mettre à jour le Local Storage
    const notes = this.getNotes();
    notes.unshift(note);
    this.setNotes(notes);
  }

  deleteNoteById(id) {
    // TODO : Supprimer une note en fonction de son ID et mettre à jour le Local Storage
    const notes = this.getNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    this.setNotes(updatedNotes);
  }

  deleteAllNotes() {
    // TODO : Supprimer toutes les notes du Local Storage
    localStorage.removeItem(this.STORAGE_KEY_NOTES);
  }

  modifyNoteById(id, content, tags) {
    // TODO : Modifier le contenu et les tags d'une note en fonction de son ID et mettre à jour le Local Storage
    const notes = this.getNotes();
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        note.content = content;
        note.tags = tags;
        note.lastEdit = new Date();
      }
      return note;
    });
    this.setNotes(updatedNotes);
  }

  pinById(id) {
    // TODO : Inverser l'état épinglé d'une note en fonction de son ID et mettre à jour le Local Storage
    const notes = this.getNotes();
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        note.pinned = !note.pinned;
      }
      return note;
    });
    this.setNotes(updatedNotes);
  }
}

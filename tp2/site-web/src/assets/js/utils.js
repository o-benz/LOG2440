/**
 * @typedef {Object} Note
 * @property {id} id identifiant unique
 * @property {string} title titre de la note
 * @property {string} content contenu textuel
 * @property {Array<string>} tags étiquettes séparées par des virgules
 * @property {Date} lastEdit date de dernière modification de la note
 * @property {string} color couleur de la note
 * @property {boolean} pinned si la note est epinglée ou non
 */

/**
 * Fonction usine pour créer un objet Note
 * @param {string} title titre de la note
 * @param {string} content contenu textuel
 * @param {Array<string>} tags étiquettes séparées par des virgules
 * @param {string} color couleur de la note
 * @param {boolean} pinned si la note est epinglée ou non
 * @returns {Note} objet Note
 */
export function createNoteObject (title, content, tags, color, pinned) {
  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    tags,
    lastEdit: new Date(),
    color,
    pinned,
  };

  return newNote;
}

/**
 * Trie un tableau d'objet de notes en fonction de l'attribut "lastEdit"
 * @param {Array<Note>} notes notes à trier
 * @param {string} sortType type de tri : "newest" ou "oldest"
 * @returns undefined : le tableau en paramètre est modifie directement
 */
export function sort (notes, sortType) {
  const sortComparer = 'newest';
  if (sortComparer === sortType) {
    notes.sort((note, note2) => { return Date.parse(note2.lastEdit) - Date.parse(note.lastEdit) });
  } else {
    notes.sort((note, note2) => { return Date.parse(note.lastEdit) - Date.parse(note2.lastEdit) });
  }
}

/**
 * Vide le contenu HTML interne d'un élément HTML quelconque
 * @param {HTMLElement} parent élément à vider
 */
export function removeAllChildren (parent) {
  parent.innerHTML = "";
}

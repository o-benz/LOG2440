import NoteEditor from '../src/assets/js/noteEditor.js';
import { jest } from "@jest/globals";

describe("NoteEditor Tests", () => {
  let noteEditor;
  // TODO : configurer le tests selon vos besoins

  function buildHTML() {
    const noteContent = document.createElement('div');
    noteContent.id = 'note-content';
    document.body.appendChild(noteContent);
  }

  // TODO : configurer la classe selon vos besoins
  beforeEach(() => {
    buildHTML();
    noteEditor = new NoteEditor(null);
  });

  // TODO : remettre la configuration dans un état valide
  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetAllMocks();
  });

  describe('getNoteIdFromURL', () => {
    it('should return null when URL has no "id" parameter', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { search: '' },
      });
      expect(noteEditor.getNoteIdFromURL()).toBeNull();
    });

    it('should return the "id" parameter from URL', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { search: '?id=testNoteId' },
      });
      // TODO : completer le test
      expect(true).toBe(true);
    });
  });

  // TODO : Tester le reste de la classe
  describe('displayNoteDetails', () => { });

  describe('pin', () => { });

  describe('delete', () => { });
});

import { defineStore } from "pinia";
import db from "@/firebase";
import {
  collection,
  doc,
  query,
  limit,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const useNotesStore = defineStore("notes", {
  state: () => ({ notes: [] }),
  getters: {
    getNotesTotal: (state) => state.notes.length,
    getNotesCharacters: (state) =>
      state.notes.reduce((total, note) => total + note.content.length, 0),
  },
  actions: {
    getNotes() {
      const q = query(
        collection(db, "notes"),
        orderBy("date", "desc"),
        limit(10)
      );
      onSnapshot(q, (snapshot) => {
        this.notes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
    addNote(note) {
      addDoc(collection(db, "notes"), note);
    },
    editNote(id, content) {
      const note = this.notes.find((note) => note.id === id);
      note.content = content;
      note.date = new Date().toLocaleString() + " (edited)";
      updateDoc(doc(db, "notes", id), note);
    },
    deleteNote(id) {
      deleteDoc(doc(db, "notes", id));
    },
  },
});

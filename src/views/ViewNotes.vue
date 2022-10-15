<script setup>
/*
  imports
*/
import { ref } from "vue";
import { useNotesStore } from "@/store/notes";
import NoteItem from "@/components/Notes/NoteItem.vue";
import { vAutofocus } from "@/directives/vAutofocus";
import { useContentLabel } from "@/composables/useContentLabel";
import { useContentError } from "@/composables/useContentError";
/*
  notes
*/
const notesStore = useNotesStore();
notesStore.getNotes();

const content = ref("");

const addNoteHandler = () => {
  notesStore.addNote({
    content: content.value,
    date: new Date().toLocaleString(),
  });
  content.value = "";
};
/*
  composables
*/
const charCount = useContentLabel(content);
const error = useContentError(content);
</script>

<template>
  <div class="notes">
    <div class="card has-background-warning p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="content"
            class="textarea is-medium"
            :class="{ 'is-danger': error }"
            placeholder="Add a note..."
            v-autofocus
          />
          <p v-if="error" class="help is-danger">Note is too long!</p>
          <p v-else class="help">{{ charCount }}</p>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNoteHandler"
            class="button is-link is-light is-warning"
            :disabled="!content || error"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>
  </div>
  <NoteItem
    v-for="note in notesStore.notes"
    :key="note.id"
    :note="note"
    @editNote="notesStore.editNote(note.id, $event)"
  />
</template>

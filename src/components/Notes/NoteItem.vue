<script setup>
/*
  imports
*/
import { ref, reactive } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";
import { useContentLabel } from "@/composables/useContentLabel";
import { useContentError } from "@/composables/useContentError";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";
/*
  emits
*/
const emit = defineEmits(["editNote"]);
/*
  note
*/
const props = defineProps({
  note: {
    name: "note",
    type: Object,
    required: true,
  },
});

const component = ref(null);
const editRef = ref(false);
const content = ref(props.note.content);

const handleEditNote = () => {
  emit("editNote", content);
  editRef.value = false;
};

const editRefSet = () => {
  editRef.value = true;
};
/*
  modals
*/
const modals = reactive({
  deleteNote: false,
});
/*
  composables
*/
const charCount = useContentLabel(content);
const error = useContentError(content);
</script>

<template>
  <component v-bind:is="component"></component>
  <div v-show="!editRef" class="card mt-4">
    <div class="card-content">
      <div class="content is-medium has-text-dark">
        {{ props.note.content }}
        <br />
      </div>
      <div class="has-text-right has-text-grey mt-2">
        <time :datetime="props.note.date">{{ props.note.date }}</time>
      </div>
    </div>
    <footer class="card-footer">
      <a @click.prevent="editRefSet" class="card-footer-item">Edit</a>
      <a @click.prevent="modals.deleteNote = true" class="card-footer-item"
        >Delete</a
      >
    </footer>
  </div>
  <div v-show="editRef" class="card mt-4">
    <div class="card-content">
      <textarea
        v-model="content"
        class="textarea is-medium"
        :class="{ 'is-danger': error }"
        v-autofocus
      />
      <p v-if="error" class="help is-danger">Edit is too long!</p>
      <p v-else class="help">{{ charCount }}</p>
    </div>
    <footer class="card-footer">
      <button
        @click.prevent="handleEditNote"
        :disabled="error"
        class="card-footer-item button is-link is-light is-warning"
      >
        Done
      </button>
    </footer>
  </div>
  <ModalDeleteNote
    v-if="modals.deleteNote"
    v-model="modals.deleteNote"
    :noteId="note.id"
  />
</template>

<style>
div {
  word-break: break-all;
}
</style>

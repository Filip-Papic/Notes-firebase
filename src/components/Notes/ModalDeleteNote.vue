<script setup>
/*
  imports
*/
import { ref, onMounted, onUnmounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useNotesStore } from "@/store/notes";
/*
  props
*/
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  noteId: {
    type: String,
    required: true,
  },
});
/*
  emits
*/
const emit = defineEmits(["update:modelValue"]);
/*
  close modal
*/
const notesStore = useNotesStore();
const closeModal = () => {
  emit("update:modelValue", false);
};
const handleKeyboard = (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
};
onMounted(() => {
  document.addEventListener("keydown", handleKeyboard);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyboard);
});
/*
  click outside vueuse
*/
const modalRef = ref(null);
onClickOutside(
  modalRef,
  () => {
    emit("update:modelValue", false);
  },
  {
    ignore: [modalRef],
  }
);
</script>

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button class="delete" @click="closeModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>Are you sure you want to delete this note?</p>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-danger" @click="notesStore.deleteNote(noteId)">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

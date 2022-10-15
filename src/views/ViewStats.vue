<script setup>
/*
  imports
*/
import { useNotesStore } from "@/store/notes";

/*
  notes
*/
const notesStore = useNotesStore();
</script>

<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Notes</td>
          <td>{{ notesStore.getNotesTotal }}</td>
        </tr>
        <tr>
          <td>Characters</td>
          <td>
            {{ notesStore.getNotesCharacters }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

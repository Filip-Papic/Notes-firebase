import { ref, watch } from "vue";

export function useContentError(content) {
  const error = ref(false);
  watch(content, (val) => {
    if (val.length > 200) {
      error.value = true;
    } else {
      error.value = false;
    }
  });

  return error;
}

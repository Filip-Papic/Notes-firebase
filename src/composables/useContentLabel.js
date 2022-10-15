import { computed } from "vue";

export function useContentLabel(content) {
  const charCount = computed(() =>
    content.value.length === 1
      ? `${content.value.length} character`
      : `${content.value.length} characters`
  );

  return charCount;
}

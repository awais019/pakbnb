<template>
  <span>
    {{ shortText }}
    <span v-if="isTooLong" @click="isExpanded = !isExpanded" class="link">
      {{ isExpanded ? "read less" : "read more" }}
    </span>
  </span>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    text: string;
    target: number;
  }>();

  const isExpanded = ref(false);
  const isTooLong = computed(() => props.text.length > props.target);
  const shortText = ref("");
  if (isTooLong.value) {
    shortText.value = props.text.slice(0, props.target) + "...";
  } else {
    shortText.value = props.text;
  }
  watch(isExpanded, (value) => {
    if (value) {
      shortText.value = props.text;
    } else {
      shortText.value = props.text.slice(0, props.target) + "...";
    }
  });
</script>

<style lang="postcss" scoped>
  .link {
    color: #ff5c23;
    cursor: pointer;
  }
</style>

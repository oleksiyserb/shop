<script setup lang="ts">
defineProps<{
  width: string;
  height: string;
  fill: string;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
      :fill="fill"
      stroke="none"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 51;360 50 51"
      ></animateTransform>
    </path>
  </svg>
</template>

<style scoped>
svg {
  margin: auto;
  display: block;
  shape-rendering: auto;
}
</style>

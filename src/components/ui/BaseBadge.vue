<script setup lang="ts">
defineProps<{
  type: string;
}>();

const selectColor = (type: string) => {
  let style;

  switch (type) {
    case "canvas":
      style = "palevioletred";
      break;
    case "sport":
      style = "brown";
      break;
    case "waterRepellent":
      style = "blue";
      break;
    default:
      style = "gray";
      break;
  }

  return style;
};
</script>

<template>
  <li :class="selectColor(type)">
    {{ type }}
  </li>
</template>

<style scoped>
li {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 12px;
  color: var(--color-text);
  font-weight: 600;
}

.brown {
  border: 2px solid brown;
  color: brown;
}

.palevioletred {
  border: 2px solid palevioletred;
  color: palevioletred;
}

.blue {
  border: 2px solid blue;
  color: blue;
}

.gray {
  border: 2px solid gray;
  color: gray;
}
</style>

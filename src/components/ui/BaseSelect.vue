<template>
  <div class="select">
    <div
      class="select__default"
      :class="{ opened: isOpened }"
      @click="toggleSelect"
    >
      <span>{{ selectedOption }}</span>
    </div>
    <div class="select__wrapper" v-show="isOpened">
      <!-- TODO: Filter and cheked if this component has corresponding prop -->
      <div class="select__option" v-for="(item, key) in items" :key="key">
        <input
          class="select__input"
          type="radio"
          :id="key"
          name="radio"
          @click="toggleOption(key, item)"
        />
        <label class="select__label" :for="key">
          {{ item }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, ref } from "vue";

const props = defineProps<{
  items: object | null;
  filter?: boolean;
  value: string | null;
}>();

const emit = defineEmits<{
  (e: "update:value", item: string): void;
}>();

const isOpened = ref<boolean>(false);
const selected = ref<string | null>(null);
const selectedText = ref<string | null>(null);

const toggleSelect = () => {
  isOpened.value = !isOpened.value;
};

const toggleOption = (id: string, item: string) => {
  selected.value = id;
  selectedText.value = item;
  emit("update:value", item);
};

const selectedOption = computed(() =>
  props.value ? props.value : "Not Selected!"
);

watch(selected, () => {
  isOpened.value = false;
});
</script>

<style scoped>
.select {
  position: relative;
  width: 20em;
  display: inline-block;
  user-select: none;
}

.select__default {
  width: inherit;
  cursor: pointer;
  position: relative;
  border-radius: 12px;
  padding: 0.5em 2em 0.5em 1em;
  display: inline-block;
  border: 1px solid var(--color-border-tertiary);
}

.select__default.opened {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.select__default::before {
  content: "";
  cursor: pointer;
  top: 50%;
  right: 0.2em;
  transform: translate(-50%);
  position: absolute;
  border: 0.3rem solid;
  border-color: white transparent transparent;
}

.select__wrapper {
  position: absolute;
  z-index: 10;
  right: 0;
  left: 0;
  background-color: var(--color-layout-tertiary);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 1px 1px 1px var(--color-layout);
  overflow: auto;
  max-height: 10em;
}

.select__option + .select__option {
  border-top: 1px solid var(--color-border);
}

.select__input {
  display: none;
}
.select__label {
  cursor: pointer;
  display: block;
  padding: 0.5em;
  transition: color, background-color 0.2s ease-in;
}

.select__input:checked + .select__label {
  color: var(--color-text);
  background-color: var(--color-link-hover);
}

.select__label:hover {
  color: var(--color-text);
  background-color: var(--color-link-hover);
}

.select__wrapper * {
  color: var(--color-text-secondary);
}
</style>

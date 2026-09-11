<template>
  <div :class="{ 'overlay active': modelValue }"></div>
  <dialog :class="{ 'active': modelValue }">
    <div class="modal-header">
      <p class="title">{{ title }}</p>
      <i @click="closeModal" class="close-icon">
        close
      </i>
    </div>
    <div class="small-divider"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup>
const props = defineProps(["modelValue", "title"]);
const emits = defineEmits(['update:modelValue'])

const closeModal = () => {
  emits('update:modelValue', false);
};

</script>

<style scoped>
dialog {
  min-width: 500px;
  padding: 0;
  border-radius: 12px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 8px 24px;
}

.modal-header .title {
  font-size: 20px;
  margin: 0;
}

.modal-header .close-icon {
  cursor: pointer;
  margin-top: -4px;
}

.modal-content {
  padding: 8px 24px 24px 24px;
}
</style>

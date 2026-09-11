<template>
  <nav class="no-space">
    <button 
      v-for="(button, index) in buttons" 
      :key="index" 
      type="button"
      @click="change($event, button.value)" 
      :class="{'fill': button.value === modelValue, 'left-round': index === 0, 'right-round': index === buttons.length-1}" 
      class="border no-round"
    >
      <span>{{ button.label }}</span>
    </button>
  </nav>
</template>

<script setup>
  defineProps(['buttons', 'modelValue'])
  const emits = defineEmits(['update:modelValue'])
  
  const change = (e, value) => {
    emits('update:modelValue', value)
  }
</script>

<style scoped>
  button {
    block-size: inherit;
    padding: 5px 5px 3px 5px;
    font-size: 11px;
    font-weight: bold;
  }
  nav {
    margin-block-start: inherit;
  }
</style>
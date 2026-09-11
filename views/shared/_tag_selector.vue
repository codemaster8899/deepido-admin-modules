<template>
  <div class="dropdown" v-click-outside="closeTags">
    <div class="selector border" @click="opneTags(false)">
    </div>
    <div class="selected-tegs tags" @click="opneTags(true)">
        <div v-for="(tag, index) in selectedTags" :key="index" class="tag" :style="{background: tag.color}">
          <span>
            {{ tag.name }}
          </span>
          <i @click="removeTag($event, index)">close</i>
        </div>
    </div>
    <div v-if="showTags" class="dropdown-popup">
      <div class="tags">
        <div @click="selectTag(tag)" v-for="(tag, index) in tags" :key="index" class="tag" :style="{background: tag.color}">
          <span>
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["modelValue", "tags"])
const emits = defineEmits(['update:modelValue'])

const showTags = ref(false)
const selectedTags = ref([])


const opneTags = (clictOnTag = false) => {
  if (!showTags.value && clictOnTag) {
    showTags.value = true
  }
  if(!clictOnTag) {
    showTags.value = !showTags.value
  }
}
const closeTags = () => {
  showTags.value = false
}
const selectTag = (tag) => {
  let index = selectedTags.value.findIndex(item => item.id === tag.id)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}
const removeTag = (e, index) => {
  e.preventDefault()
  selectedTags.value.splice(index, 1)
}

watch(
  () => selectedTags.value.length,
  () => {
    const ids = selectedTags.value.map(item => item.id)
    emits('update:modelValue', ids)
  }
)
watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue.length) {
      selectedTags.value = []
    }
  },
  { deep: true } 
)

</script>

<style scoped>
  .dropdown {
    position: relative;
  }
  .selector {
    min-height: 40px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    cursor: text;
  }
  .dropdown-popup {
    margin-top: 5px;
    width: 100%;
    padding: 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: #e7e6e6;
    position: absolute;
    z-index: 10000;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .tag {
    padding: 1px 10px 0px 10px;
    display: flex;
    align-items: center;
    height: 22px;
    cursor: pointer;
  }
  .tag span {
    font-size: 12px;
    color: white;
  }
  .selected-tegs {
    position: absolute;
    top: 9px;
    left: 9px;
    padding-right: 20px;
  }
  .selected-tegs .tag {
    cursor: auto;
    padding-right: 2px;
  }
  .selected-tegs .tag span {
    user-select: none;
    cursor: auto;
  }
  .selected-tegs .tag i {
    color: white;
    cursor: pointer;
    font-size: 15px;
    margin-bottom: 3px;
  }
</style>
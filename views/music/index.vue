<template>
  <main class="responsive max">
    <div class="grid">
      <div class="s12">
        <filters :pagination="store.pagination"></filters>
        <table class="stripes large-space ">
          <thead>
            <tr>
              <th
                v-for="(item, index) in tableRows"
                :key="`name_${index}`"
                :style="{ width: item.width, 'text-align': (item.field === 'validated' ? 'right' : 'start') }">
                {{ $t(item.label) }}
                <label v-if="item.field === 'validated'" class="checkbox">
                  <input v-model="isValidated" type="checkbox" @change="toggleAll">
                  <span></span>
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in store.contents" :key="content.id">
              <td><a class="link" :href="'/fr/music/' + content.id">{{ content.id }}</a></td>
              <td>{{ content.created_at }}</td>
              <td>{{ content.artist }}</td>
              <td>
                {{ content.name }}
                <div class="tags">
                  <a v-for="tag in content.tags" :key="tag.id" :style="{ 'background-color': tag.color }" class="chip tag">
                    {{ tag.label }}
                  </a>
                </div>
              </td>
              <td style="text-align: right">{{ content.played_count }}</td>
              <td style="text-align: right">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    v-model="content.validated"
                    @change="toggleValidated(content.id)">
                  <span></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pagination v-if="store.pagination" :store="store" @clicked="fetchData"></pagination>
  </main>
</template>

<script setup>
import pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";

import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()

import { MusicStore } from "../../stores/music"
const store = MusicStore()

const isValidated = ref(false)
const tableRows = [
  { field: "id", label: "id", width: '90px' },
  { field: "created_at", label: "created_at", width: '110px' },
  { field: "artist", label: "music.artist", width: '250px' },
  { field: "title", label: "music.title" },
  { field: "played_count", label: "music.played_count", width: '75px' },
  { field: "validated", label: "music.validated", width: '110px' },
]

const toggleValidated = (id) => {
  if (store.contents.every(elem => elem.validated)) {
    isValidated.value = true
  } else {
    isValidated.value = false
  }
  store.update(id)
}

const toggleAll = () => {
  console.log(isValidated.value);
  store.contents.forEach(elem => {
    elem.validated = isValidated.value
  });
  store.updateAll(isValidated.value)
}

const fetchData = () => {
  store.index(route.fullPath)
}

watch(
  () => store.contents,
  () => {
    if (store.contents.every(elem => elem.validated)) {
      isValidated.value = true
    } else {
      isValidated.value = false
    }
  }
)

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
th {
  max-inline-size: inherit;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.tag {
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  margin: 0;
}

.tag:hover {
  color: var(--primary);
}
</style>

<template>
  <main class="responsive max">
    <div class="grid">
      <div class="s12">
        <filters 
          :pagination="Store.pagination"
        />
        <table class="stripes large-space table-contacts">
          <thead>
            <tr>
              <th
                v-for="(field, index) in $tm('playlist.table')" 
                :key="`name_${index}`"
                class="min"
              >
                {{$rt(field)}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="playlist in Store.playlists" :key="playlist.id">
              <td  
                v-for="(field, index) in $tm('playlist.table')" 
                :key="`value_${index}`"
              >
                <span v-if="!clickableItems(index)">
                  {{ playlist[index]}}
                </span>
                <span 
                  v-else 
                  @click="redirectTo(index, playlist.id)"
                  class="link"
                  style="cursor: pointer"
                >
                  {{ playlist[index] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <SharedPagination 
          v-if="Store.pagination" 
          :store="Store" 
          @clicked="fetchData" 
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import SharedPagination from '../shared/_pagination.vue';
import filters from './_filters.vue'

import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()

import { PlaylistsStore } from "../../stores/playlist"
const Store = PlaylistsStore()

const fetchData = () => {
  Store.index(route.fullPath)
}

const clickableItems = (index) => {
  if (index == "id" || index == "updated_at" || index == "name") {
    return true
  } else return false
}

const redirectTo = (name, id) => {
  if(name === "updated_at") {
    router.push({ name: `playlist`, params: {id, tab:'history'} })
  } else router.push({ name: 'playlist', params: { id } })
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
  th:nth-child(6) {
    width: 100%;
  }
</style>

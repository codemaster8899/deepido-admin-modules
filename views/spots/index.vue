<template>
  <main class="responsive max">
    <filters :pagination="store.pagination"></filters>
    <table class="stripes large-space table-contacts">
      <thead>
        <tr>
          <th style="width: 90px;">{{ $t('spots.device') }}</th>
          <th style="width: 160px;">{{ $t('spots.last_response') }}</th>
          <th>{{ $t('spots.site') }}</th>
          <th style="width: 70px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="spot in store.spots" :key="spot.id">
          <td>
            <SharedSpot :spot="spot" />
          </td>
          <td>
            <span :class="spot.klass" class="chip fill">
              <router-link :to="'/spots/' + spot.id" title="Statut de connection du Player">{{ spot.last_response }}</router-link>
            </span>
          </td>
          <td>
            <p v-if="spot.site.site_ref">{{ spot.site.organisation_name }} {{ spot.site.site_name }} </p>
            <p v-else>{{ spot.site.organisation_name }} {{ spot.site.site_name }}</p>
            <span @click.prevent="showTags({ spot: spot })" v-for="tag in spot.tags" :key="tag.id" class="tag" :style="'background-color: ' + tag.color">{{ tag.name }}</span>
          </td>
          <td>
            <a class="link" :href="'/fr/fleet/spots/' + spot.id + '/controls'">Logs</a>
          </td>
        </tr>
      </tbody>
    </table>
    <SharedPagination v-if="store.pagination" :store="store" @clicked="fetchData" />
    <modal v-model="tagsModal" title="Tags perso">
      <contentSpotTagsModal/>
    </modal>
  </main>
</template>

<script setup>
import SharedPagination from "../shared/_pagination.vue";
import SharedSpot from "../shared/_spot.vue";
import filters from "./_filters.vue";
import { SpotStore } from "../../stores/spot"
import modal from "../shared/_modal.vue"
import contentSpotTagsModal from "./modals/tags.vue"

const store = SpotStore()
const route = useRoute()
const tagsModal = ref(false)

const fetchData = () => {
  store.index(route.fullPath)
}
const showTags = (spot) => {
  tagsModal.value = true
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.tag {
  padding: 6px 6px 3px 6px;
  font-size: 13px;
  border-radius: 3px;
  color: #fff;
  margin-right: 6px;
}
</style>

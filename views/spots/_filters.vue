<template>
  <section class="filters">
    <div class="row-top">
      <a href="#" @click="toggleForm">
        <i :class="showFilters ? 'open' : 'closed'" class="tiny">keyboard_arrow_right</i>
        {{ $t('filter') }}
        <span v-if="pagination.count > 0">
          &nbsp;({{ pagination.count }} {{ $t('results', pagination.count) }})
        </span>
      </a>
      <div>
        <button class="link button transparent" @click.prevent="exportXls" >
          <i style="font-size: 19px; margin-bottom: 4px;">format_list_bulleted</i> {{ $t('xls_export') }}
        </button>
        <button @click="toggleManager" class="link button transparent">
          <i style="font-size: 19px; margin-bottom: 4px;">build</i>Piloter
        </button>
      </div>
    </div>
    <form class="content-section" @submit.prevent="filter" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 m4 l2">
          <label>Connexion</label>
          <buttonGroup v-model="form.alive" :buttons='aliveButtons'></buttonGroup>
        </div>
        <div class="s12 m4 l2">
          <label >Désactivé</label>
          <buttonGroup v-model="form.active_eq" :buttons='activeEqButtons'></buttonGroup>
        </div>
        <div class="s12 m4 l2">
          <label >Synchro</label>
          <buttonGroup v-model="form.with_sync_status" :buttons='withSyncStatusButtons'></buttonGroup>
        </div>
        <div class="s12 m4 l2">
          <label>Type</label>
          <buttonGroup v-model="form.soc_eq" :buttons='socEqButtons'></buttonGroup>
        </div>
        <div class="s12 m4 l2">
          <label>Genre</label>
          <buttonGroup v-model="form.type_eq" :buttons='typeEqButtons'></buttonGroup>
        </div> 
        <div class="s12 m4 l2">
          <label>Streaming</label>
          <buttonGroup v-model="form.streaming_eq" :buttons='streamingEqButtons'></buttonGroup>
        </div>
        <div class="s12 l2">
          <div class="field border small">
            <label>Spot</label>
            <input type="text" v-model="form.id_eq">
          </div>
        </div>  
        <div class="s12 l2">
          <div class="field border small">
            <label>Device</label>
            <input type="text" v-model="form.device_id_eq">
          </div>
        </div>
        <div class="s12 l4">
          <div class="field border small">
            <label>Client</label>
            <input type="text" v-model="form.site_organisation_client_name_cont">
          </div>
        </div>  
        <div class="s12 l4">
          <div class="field border small">
            <label>Site</label>
            <input type="text" v-model="form.siteref_cont">
          </div>
        </div>
        <div v-if="showAdvancedSection" class="grid l12">
          <div class="s12 l3">
            <div class="field border small">
              <label>OS</label>
              <input type="text" placeholder="Ex: Tizen / Tizen 4 / Webos / Linux"  v-model="form.device_data_os">
            </div>
          </div>
          <div class="s12 l3">
            <div class="field border small">
              <label>Model</label>
              <input type="text" placeholder="Ex: OM55N" v-model="form.device_data_model">
            </div>
          </div>
          <div class="s12 l2">
            <div class="field border small">
              <label>Player version</label>
              <input type="text" placeholder="Ex: 1.4.7" v-model="form.device_data_player_version">
            </div>
          </div>            
          <div class="s12 l2">
            <div class="field border small">
              <label>Firmware</label>
              <input type="text" placeholder="Ex: T-MSMLWWC" v-model="form.device_data_firmware">
            </div>
          </div>
          <div class="s12 l2">
            <div class="field border small">
              <label>Network type</label>
              <input type="text" placeholder="Ex: WIFI / ETH" v-model="form.device_data_network_type">
            </div>
          </div>
        </div>
        <div class="s12 l8">
          <div class="field border small">
            <label>Tag</label>
            <tagSelector :tags="tagsStore.tags" v-model="form.device_taggings_tag_id_in"/>
          </div>

        </div> 
        <div class="s12 l4 filter-actions">
          <button class="button transparent border" @click="toggleAdvanced">Advanced</button>
          <button @click="resetFilter" class="button transparent border">Reset filters</button>
          <button type="submit" class="button btn-primary">{{ $t('filter')  }}</button>
        </div>
      </div> 
    </form>
    <div class="manager content-section" :class="showManager ? '' : 'hidden'">
      <h6>Action en masse sur les {{ pagination.count }} players</h6>
      <div class="actions">
        <div>
          <button @click.prevent="playerManage('player_reload')" class="btn error">Reload</button>
          <button @click.prevent="playerManage('player_sync')" class="btn error">Synchronize</button>
        </div>
        <router-link class="link" to="/metrics">&raquo;&nbsp;Voir toutes les opérations en cours</router-link>
      </div>
    </div>    
  </section>
</template>

<script setup>
import buttonGroup from "../shared/_button_group.vue"
import tagSelector from "../shared/_tag_selector.vue"
import { SpotStore } from "../../stores/spot"
import { TagsStore } from "../../stores/tags"
import useXlsx from '../../composable/useXlsx.js'

const props = defineProps(["pagination"]);
const router = useRouter();
const route = useRoute();
const store = SpotStore()
const tagsStore = TagsStore()

const showFilters = ref(false)
const showAdvancedSection = ref(false)
const showManager = ref(false)
const player_version = ref(null)
const form = ref({
    alive: "",
    type_eq: "",
    with_sync_status: "",
    soc_eq: "",
    active_eq: "",
    streaming_eq: "",
    id_eq: "",
    siteref_cont: "",
    device_id_eq: "",
    device_taggings_tag_id_in: [],
    device_data_os: "",
    device_data_model: "",
    device_data_player_version: "",
    device_data_firmware: "",
    device_data_network_type: "",
})
const aliveButtons = [
  {label: "Tous", value: ""},
  {label: "Connecté", value: "ok"},
  {label: "Déconnecté", value: "Ko"}
]
const activeEqButtons = [
  {label: "Tous", value: ""},
  {label: "Non", value: "true"},
  {label: "Oui", value: "false"}
]
const withSyncStatusButtons = [
  {label: "Tous", value: ""},
  {label: "Ok", value: "ok"},
  {label: "Erreur", value: "ko"}
]
const socEqButtons = [
  {label: "Tous", value: ""},
  {label: "DeepiBox", value: "false"},
  {label: "Ecran", value: "true"}
]
const typeEqButtons = [
  {label: "Tous", value: ""},
  {label: "Audio", value: "Spots::Audio"},
  {label: "Video", value: "Spots::Video"}
]
const streamingEqButtons = [
  {label: "Tous", value: ""},
  {label: "Oui", value: "true"},
  {label: "Non", value: "false"}
]
const toggleForm = () => {
  showFilters.value = !showFilters.value
  showManager.value = false
}
const toggleAdvanced = () => {
  showAdvancedSection.value = !showAdvancedSection.value 
}
const toggleManager = () =>  {
  showFilters.value = false
  showManager.value = !showManager.value
}
const filter = () => {
  let query = {};
  for (let el in form.value) { 
    if (form.value[el]) {
      if(el === "device_taggings_tag_id_in"){
      query["q[" + el + "][]"] = form.value[el];
      }
      else{
        query["q[" + el + "]"] = form.value[el];
      }        
    }
  }
  router.push({ query: query });
}
const resetFilter = () => {
  for (let el in form.value) {
    if(el === "device_taggings_tag_id_in"){
      form.value[el] = []
    }
    else{
      form.value[el] = ""
    }    
  }
  router.push({ query: {} });
}
const playerManage = (action) => {
  store.manage({
    query: route.query,
    do: action,
    player_version: player_version.value    
  })
}

const { exportXlsx } = useXlsx();
const exportXls = () => {
  exportXlsx("/xlsx", { klass: 'Spot', query: route.query })
}

onMounted(() => {
  for (const key in route.query) {
    form.value[key.slice(2, -1)] = route.query[key]
  }
  tagsStore.index('device')
})

</script>

<style scoped>
  label {
    font-weight: 600;
  }
  .grid {
    margin-top: 0 ;
  }
  .filter-actions {
    display: flex;
    gap: 5px;
    margin-top: 24px;
  }
  .content-section {
    padding: 20px;
    background: white;
    margin-bottom: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .manager .actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .manager .actions button {
    margin-left: 0;
  }
</style>

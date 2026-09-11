<template>
  <form v-on:submit.prevent="duplicate" accept-charset="UTF-8" class="form" :class="store.progress_duplicate">
    <div class="field label border">
      <input @input="autocomplete" v-model="searchTerm" type="text">
      <label>Premieres lettres du client...</label>
    </div>
    <div v-if="store.organisations.length && isOpen" class="organisation-box">
      <div class="organisation" v-for="organisation in store.organisations" :key="organisation.id"
        @click.prevent="setTarget(organisation)">
        <span class="link">{{ organisation.name }}</span>
      </div>
    </div>
    <p><b>ATTENTION: soyez certains que tous les titres de cette playlists soient bien accessibles au sein de
        l'organisation cible !!!</b></p>
    <br />
    <button>Dupliquer</button>
  </form>
</template>

<script setup>
import useDebounce from '../../../composable/useDebounce';
import { useRoute, useRouter } from "vue-router"
import { PlaylistsStore } from "../../../stores/playlist"

const emit = defineEmits(['closeModal'])

const store = PlaylistsStore()
const route = useRoute()
const router = useRouter();

const searchTerm = ref('');
const isOpen = ref(false);
const selectedOrganisationId = ref(null);

const { debouncedCallback } = useDebounce((value) => {
  store.autocomplete(value)
  isOpen.value = true
}, 500);

const autocomplete = () => {
  debouncedCallback(searchTerm.value)
}

const setTarget = (organisation) => {
  selectedOrganisationId.value = organisation.id
  searchTerm.value = organisation.name
  isOpen.value = false
}

const duplicate = () => {
  store.duplicate(route.params.id, selectedOrganisationId.value).then(response => {
    emit('closeModal')
    setTimeout(function () {
      router.push({ name: 'playlist', params: { id: response.playlist.id } })
    }, 1000)
  }).catch(error => {
    console.log('err')
    console.log(error);
    //alert("Une erreur est survenue :-/");
  })
}
</script>

<style scoped>
.button {
  margin-left: 0;
  margin-top: 10px;
}

.organisation-box {
  margin-top: -25px;
  margin-bottom: 15px;
  max-height: 400px;
  overflow-y: auto;
}

.organisation {
  border-bottom: solid 1px #c0c0c0;
  border-radius: 0;
  padding: 10px 0 5px 0;
}

.organisation:hover {
  background: #f1f1f1;
}

.organisation span {
  cursor: pointer;
}
</style>

<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{ name: 'playlists' }">{{ $t('main_nav.playlists') }}</router-link></li>
      <li>{{ Store.playlist.name }}</li>
    </ul>

    <ul class="tabs-container">
      <li class="active"><a href="#">Playlist</a></li>
      <li><router-link :to="{ 'name': 'playlist_history', params: { id: Store.playlist.id } }">History</router-link>
      </li>
    </ul>

    <div class="content">
      <form @submit.prevent="update" class="form" :class="Store.progress">
        <PlaylistForm></PlaylistForm>

        <div class="bottom-actions">
          <a class="button transparent border" :href="'/fr/api/admin/playlists/' + Store.playlist.id + '.xlsx'">
            <i style="font-size: 19px; margin-bottom: 4px;">format_list_bulleted</i>Export Excel
          </a>
          <a class="button" style="background: #ff9800" @click.prevent="openDuplicateModal = true">Copier</a>
          <a href="#" @click.prevent="destroy" class="link" style="text-decoration: none; margin-top: 3px;">
            <i style="color: red;padding-right: 5px; margin-bottom: 8px;">×</i>
            <span>Supprimer</span>
          </a>
          <button style="float: right" class="progress">{{ $t('save') }}</button>
        </div>
      </form>
    </div>

    <modal v-model="openDuplicateModal" title="Dupliquer vers...">
      <duplicationModalContent @closeModal="closeModal" />
    </modal>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import PlaylistForm from "./_form.vue"

import { PlaylistsStore } from "../../stores/playlist";
const Store = PlaylistsStore();

const update = () => {
  Store.update(route.params.id);
}

const { t } = useI18n();
const destroy = () => {
  if (confirm(t('confirm'))) {
    Store.destroy(Store.playlist.id).then(() => {
      router.push({ name: 'playlists' });
    })
  }
}

import modal from "@/javascript/admin/views/shared/_modal.vue";
import duplicationModalContent from "./modals/duplication.vue";

const openDuplicateModal = ref(false)
const closeModal = () => {
  openDuplicateModal.value = false
}

onMounted(() => {
  Store.show(route.params.id);
})
</script>

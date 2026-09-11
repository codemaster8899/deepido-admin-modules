<template>
  <div class="grid">
    <div class="s12 l6">
      <div class="field label border">
        <input v-model="Store.playlist.name" type="text">
        <label>{{ $t('name') }}*</label>
        <SharedErrors attr="name" :messages="Store.errors" />
      </div>
      <div class="field textarea label border">
        <textarea v-model="Store.playlist.info_sensation"></textarea>
        <label>Sensation</label>
      </div>
    </div>
    <div class="s12 l6">
      <div class="grid">
        <div class="s12 l6">
          <span for=""><b>Playlist locale</b></span>
          <div>
            <input type="radio" name="local" v-model="Store.playlist.is_fallback" value="true" />&nbsp;Oui
            <input type="radio" name="local" v-model="Store.playlist.is_fallback" value="false" />&nbsp;Non
          </div>
        </div>
        <div class="s12 l6">
          <span for="">Validé</span>
          <div>
            <input type="radio" name="valid" v-model="Store.playlist.is_validated" value="true" />&nbsp;Oui
            <input type="radio" name="valid" v-model="Store.playlist.is_validated" value="false"
              style="margin-left: 30px;" />&nbsp;Non
          </div>
        </div>
      </div>
      <div class="large-divider"></div>
      <div class="field textarea label border">
        <textarea v-model="Store.playlist.info_audience"></textarea>
        <label>Audience</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";

import { PlaylistsStore } from "../../stores/playlist";
const Store = PlaylistsStore();
</script>
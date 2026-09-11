<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{ name: 'playlists' }">{{ $t('main_nav.playlists') }}</router-link></li>
      <li>{{ Store.playlist.name }}</li>
    </ul>

    <ul class="tabs-container">
      <li><router-link :to="{ 'name': 'playlist', params: { id: Store.playlist.id } }">Playlist</router-link></li>
      <li class="active"><a href="#">History</a></li>
    </ul>

    <div class="content">
      <!-- <table class='table table-striped table-thin'>
              <thead>
                <tr>
                  <th style="width: 100px;">Modif. le</th>
                  <th style="width: 120px;">Par</th>
                  <th style="width: 80px;text-align: center">Titres</th>
                  <th style="width: 80px;text-align: center">Ajoutés</th>
                  <th style="width: 80px;text-align: center">Supprimés</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="timepoint in playlist.history" :key="timepoint.id">
                  <td>{{ timepoint.updated_at }}</td>
                  <td><router-link :to="'/users/' + timepoint.user_id">{{ timepoint.updated_by }}</router-link></td>
                  <td style="text-align: center">
                    <span v-if="timepoint.added_ids == 0">0</span>
                    <router-link v-else :to="'/playlists/' + playlist.id + '/history/' + timepoint.id + '/all'">{{ timepoint.total_count }}</router-link>
                  </td>
                  <td style="text-align: center">
                    <span v-if="timepoint.added_count == '0'">0</span>
                    <router-link v-else :to="'/playlists/' + playlist.id + '/history/' + timepoint.id + '/added'">{{ timepoint.added_count }}</router-link>
                  </td>
                  <td style="text-align: center">
                    <span v-if="timepoint.removed_count == '0'">0</span>
                    <router-link v-else :to="'/playlists/' + playlist.id + '/history/' + timepoint.id + '/removed'">{{ timepoint.removed_count }}</router-link>
                  </td>
                </tr>
              </tbody>
            </table> -->
      <!--pagination :pagination="pagination"></pagination-->
    </div>
  </main>
</template>


<!-- <script setup>
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
import { PlaylistsStore } from "../../stores/playlist"

const route = useRoute();
const router = useRouter();

const store = PlaylistsStore()
onMounted(() => {
  // store.history(route.path)
})

// import pagination from "../shared/_pagination.vue";

// export default {
//   components: {
//     'pagination': pagination
//   },

//   data: function() {
//     return this.$store.state.PlaylistStore;
//   },

//   mounted: function() {
//     this.$store.dispatch('PlaylistStore/history', this.$route.fullPath);
//   }
// }
</script> -->

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

import PlaylistForm from "./_form.vue"

import { PlaylistsStore } from "../../stores/playlist";
const Store = PlaylistsStore();

onMounted(() => {
  Store.show(route.params.id);
})
</script>
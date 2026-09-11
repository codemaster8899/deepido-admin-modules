<template>
  <main class="responsive max">
    <div class="grid">
      <div class="s12">
        <filters :pagination="Store.pagination"></filters>

        <table class="stripes large-space table-clients">
          <thead>
            <tr>
              <th class="fixed-width">{{ $t('ref') }}</th>
              <th class="fixed-width">{{ $t('created_at') }}</th>
              <th>{{ $t('name') }}</th>
              <th>Marque</th>
              <th class="fixed-width"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in Store.clients" :key="client.id">
              <td><router-link :to="{ name: 'client', params: { id: client.id } }" class="link">{{ client.id
                  }}</router-link></td>
              <td>{{ client.created_at }}</td>
              <td><router-link :to="{ name: 'client', params: { id: client.id } }" class="link">{{ client.name
                  }}</router-link></td>
              <td>{{ client.brand }}</td>
              <td>Générer un rapport</td>
            </tr>
          </tbody>
        </table>

        <SharedPagination v-if="Store.pagination" :store="Store" @clicked="load"></SharedPagination>
      </div>
    </div>
  </main>
</template>

<script setup>
import SharedPagination from '../shared/_pagination.vue'
import filters from "./_filters.vue"

import { ClientStore } from '@/javascript/admin/stores/client'
import { useRoute } from 'vue-router'

const route = useRoute()
const Store = ClientStore()

const load = () => {
  Store.index(route.fullPath);
}
onMounted(() => {
  load();
})
</script>

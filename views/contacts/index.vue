<template>
  <main class="responsive max">
    <div class="grid">
      <div class="s12">
        <filters :pagination="Store.pagination"></filters>

        <table class="stripes large-space table-contacts">
          <thead>
            <tr>
              <th class="fixed-width">{{ $t('users.last_name') }}</th>
              <th class="fixed-width">{{ $t('contacts.entity') }}</th>
              <th>{{ $t('users.email') }}</th>
              <th class="fixed-width">{{ $t('users.phone') }}</th>
              <th class="fixed-width">{{ $t('created_at') }}</th>
              <th class="fixed-width">{{ $t('updated_at') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in Store.contacts" :key="contact.id">
              <td>
                <router-link :to="{ name: 'contact', params: { id: contact.id } }" class="link">
                  {{ contact.firstname }} {{ contact.lastname }}
                </router-link>
              </td>
              <td>{{ contact.entity }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.phone }}</td>
              <td>{{ contact.created_at }}</td>
              <td>{{ contact.updated_at }}</td>
            </tr>
          </tbody>
        </table>

        <SharedPagination v-if="Store.pagination" :store="Store" @clicked="load" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router"
const route = useRoute();

import { ContactStore } from '../../stores/contact'
const Store = ContactStore();

import filters from "./_filters.vue";
import SharedPagination from '../shared/_pagination.vue';

const load = () => {
  Store.index(route.fullPath);
}
onMounted(() => {
  load();
})
</script>

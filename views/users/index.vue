<template>
  <main class="responsive max">
    <div class="grid">
      <div class="s12">
        <UsersFilters :pagination="Store.pagination" />
        <table class="stripes large-space table-users">
          <thead>
            <tr>
              <th class="fixed-width">{{ $t('ref') }}</th>
              <th class="fixed-width">{{ $t('created') }}</th>
              <th class="fixed-width">{{ $t('users.role') }}</th>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('organisation') }}</th>
              <th class="fixed-width" style="width: 120px;">{{ $t('users.brand') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in Store.users">
              <td><router-link :to="{ name: 'user', params: { id: user.id } }" class="link">{{ user.id }}</router-link>
              </td>
              <td>{{ user.created_at }}</td>
              <td>{{ user.role }}</td>
              <td><router-link :to="{ name: 'user', params: { id: user.id } }" class="link">{{ user.name
                  }}</router-link>
              </td>
              <td>{{ user.organisation }}</td>
              <td>{{ user.brand }}</td>
            </tr>
          </tbody>
        </table>

        <SharedPagination v-if="Store.pagination" :store="Store" @clicked="load" />
      </div>
    </div>

  </main>
</template>

<script setup>
import UsersFilters from './_filters.vue';
import SharedPagination from '../shared/_pagination.vue';

import { UserStore } from "../../stores/user.js";
const Store = UserStore();

const Route = useRoute();
const load = function () {
  Store.index(Route.fullPath);
}

onMounted(() => {
  load();
})
</script>

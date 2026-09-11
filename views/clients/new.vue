<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li>
        <router-link :to="{ name: 'clients' }">{{ $t('main_nav.clients') }}</router-link>
      </li>
      <li>{{ $t('clients.new_client') }}</li>
    </ul>

    <div class="content">
      <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form" :class="Store.progress">
        <client-form></client-form>
        <button class="progress">{{ $t('save') }}</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

import ClientForm from "./_form.vue";

import { ClientStore } from '@/javascript/admin/stores/client'
const Store = ClientStore()

const create = async () => {
  Store.create().then(response => {
    router.push({ name: 'client', params: { id: response.client.id } })
  })
}

onMounted(() => {
  Store.new();
})
</script>

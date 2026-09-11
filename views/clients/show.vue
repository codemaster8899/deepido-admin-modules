<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li>
        <router-link :to="{ name: 'clients' }">{{ $t('main_nav.clients') }}</router-link>
      </li>
      <li>{{ Store.client.name }}</li>
    </ul>

    <div class="content">
      <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form" :class="Store.progress">
        <client-form></client-form>
        <button style="float: right" class="progress">{{ $t('save') }}</button>
        <a href="#" data-ui="#modal-destroy" class="button transparent border">{{ $t('delete') }}</a>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import ClientForm from "./_form.vue";

import { ClientStore } from '@/javascript/admin/stores/client';
const Store = ClientStore();

const update = async () => {
  Store.update(route.params.id);
}

onMounted(() => {
  Store.show(route.params.id);
})
</script>

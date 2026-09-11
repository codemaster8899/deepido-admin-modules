<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{ name: 'contacts' }">{{ $t('main_nav.contacts') }}</router-link></li>
      <li>{{ Store.contact.firstname }} {{ Store.contact.lastname }}</li>
    </ul>

    <div class="content">
      <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form" :class="Store.progress">
        <contact-form></contact-form>
        <button style="float: right" class="progress">{{ $t('save') }}</button>
        <a href="#" @click="destroy" class="button transparent border">{{ $t('delete') }}</a>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

import ContactForm from "./_form.vue";

import { ContactStore } from '../../stores/contact';
const Store = ContactStore();

const update = async () => {
  Store.update(route.params.id);
}

const destroy = async () => {
  if (confirm(t('confirm'))) {
    Store.destroy(route.params.id).then(() => {
      router.push('/contacts');
    })
  }
}

onMounted(() => {
  Store.show(route.params.id);
})
</script>

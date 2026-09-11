<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li>
        <router-link :to="{ name: 'contacts' }">{{ $t('main_nav.contacts') }}</router-link>
      </li>
      <li>{{ $t('contacts.new_contact') }}</li>
    </ul>

    <div class="content">
      <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form" :class="Store.progress">
        <contact-form></contact-form>
        <button>{{ $t('create') }}</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();

import { ContactStore } from '../../stores/contact'
const Store = ContactStore();

import ContactForm from "./_form.vue";

const create = () => {
  Store.create().then(response => {
    router.push("/contacts/" + response.id)
  })
}

onMounted(() => {
  Store.new();
})
</script>

<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{ name: 'users' }">{{ $t('main_nav.users') }}</router-link></li>
      <li>{{ Store.user.full_name }}</li>
    </ul>

    <div class="content">
      <form @submit.prevent="update" accept-charset="UTF-8" class="form" :class="Store.progress">
        <UsersForm />
        <button class="progress">{{ $t('save') }}</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import UsersForm from './_form.vue';

import { UserStore } from "../../stores/user.js";
const Store = UserStore();

const Route = useRoute();

const update = function () {
  Store.update(Route.params.id);
}

onMounted(() => {
  Store.show(Route.params.id);
})
</script>

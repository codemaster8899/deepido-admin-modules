<template>
  <section class="filters">
    <div class="row-top">
      <a href="#" @click.prevent="toggleForm">
        <i :class="showFilters ? 'open' : 'closed'" class="tiny">keyboard_arrow_right</i>
        {{ $t('filter') }}
        <span v-if="props.pagination.count > 0">
          &nbsp;({{ props.pagination.count }} {{ $t('results', props.pagination.count) }})
        </span>
      </a>
      <router-link :to="{ name: 'new_contact' }" class="button tertiary">
        <b>{{ $t('contacts.add_contact') }}</b>
      </router-link>
    </div>

    <form @submit.prevent="search" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.firstname_cont" />
            <label>{{ $t('users.first_name') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.lastname_cont" />
            <label>{{ $t('users.last_name') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.entity_cont" />
            <label>{{ $t('contacts.entity') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.email_cont" />
            <label>{{ $t('users.email') }}</label>
          </div>
        </div>
        <div class="s12 m6 l4">
          <div class="field label border">
            <input type="text" v-model="form.phone_cont" />
            <label>{{ $t('users.phone') }}</label>
          </div>
        </div>
      </div>

      <div class="row-actions">
        <a @click="reset" href="#" class="button transparent border">{{ $t('reset_filters') }}</a>
        <button class="btn">{{ $t('filter') }}</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const props = defineProps(['pagination']);

const form = reactive({
  firstname_cont: route.query["q[firstname_cont]"],
  lastname_cont: route.query["q[lastname_cont]"],
  entity_cont: route.query["q[entity_cont]"],
  email_cont: route.query["q[email_cont]"],
  phone_cont: route.query["q[phone_cont]"],
})

const showFilters = ref(false)
const toggleForm = () => {
  showFilters.value = !showFilters.value
}

const search = () => {
  let query = {};
  for (let el in form) {
    query["q[" + el + "]"] = form[el];
  }
  router.push({ query: query });
}
const reset = () => {
  form.value = { ...form.value, firstname_cont: '', lastname_cont: '', entity_cont: '', email_cont: '', phone_cont: '' };
  router.push({ path: route.path, query: '' })
}
</script>

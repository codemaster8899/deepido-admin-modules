<template>
  <section class="filters">
    <div class="row-top">
      <a href="#" @click="toggleForm">
        <i :class="showFilters ? 'open' : 'closed'" class="tiny">keyboard_arrow_right</i>
        {{ $t('filter') }}
        <span v-if="pagination.count > 0">
          &nbsp;({{ pagination.count }} {{ $t('results', pagination.count) }})
        </span>
      </a>
    </div>
    <form @submit.prevent="search" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 l6">
          <div class="field label border">
            <input type="text" v-model="form.name_cont">
            <label>Nom</label>
          </div>
        </div>
        <div class="s12 l6">
          <div class="field label border">
            <input type="text" v-model="form.organisation_client_name_cont">
            <label>Client</label>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <input type="date" v-model="form.created_at_gteq">
            <label>Créée entre le...</label><i>today</i>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <input type="date" v-model="form.created_at_lteq">
            <label>... et le</label><i>today</i>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <input type="date" v-model="form.updated_at_gteq">
            <label>Modifiee entre le...</label><i>today</i>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <input type="date" v-model="form.updated_at_lteq">
            <label>... et le</label><i>today</i>
          </div>
        </div>
        <div class="s12 l4">
          <div class="field label suffix border">
            <select v-model="form.is_rescue_eq">
              <option value="true">Local</option>
              <option value="false">Streaming</option>
            </select>
            <label>Type</label>
            <i>arrow_drop_down</i>
          </div>
        </div>
      </div>

      <div class="row-actions">
        <a @click="reset" class="button transparent border">{{ $t('reset_filters') }}</a>
        <button class="btn">{{ $t('filter') }}</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

const props = defineProps(["pagination"]);

const form = ref({})
const showFilters = ref(false)
const toggleForm = () => {
  showFilters.value = !showFilters.value
}
const search = () => {
  let query = {};
  for (let el in form.value) {
    if (form.value[el]) {
      query[`q[${el}]`] = form.value[el];
    }
  }
  router.push({ query: query });
}

const reset = () => {
  if (Object.keys(form.value).length) {
    form.value = {};
    router.push({ path: route.path, query: '' })
  }
}
onMounted(() => {
  for (const key in route.query) {
    form.value[key.slice(2, -1)] = route.query[key]
  }
})
</script>

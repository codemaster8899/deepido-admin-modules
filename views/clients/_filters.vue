<template>
  <section class="filters">
    <div class="row-top">
      <div>
        <a href="#" @click.prevent="toggleForm">
          <i :class="showFilters ? 'open' : 'closed'" class="tiny">keyboard_arrow_right</i>
          {{ $t('filter') }}
          <span v-if="props.pagination.count > 0">
            &nbsp;({{ props.pagination.count }} {{ $t('results', props.pagination.count) }})
          </span>
        </a>
        &nbsp;|&nbsp;
        <a :href="searchQuery()" class="link">
          <i class="tiny">docs_apps_script</i>{{ $t('xls_export') }}
        </a>
      </div>
      <router-link :to="{ name: 'new_client' }" class="button tertiary">
        <b>{{ $t('clients.add_client') }}</b>
      </router-link>
    </div>

    <form @submit.prevent="search" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 m6 l4">
          <div class="field label border">
            <input type="text" v-model="form.id_eq" />
            <label>{{ $t('ref') }}</label>
          </div>
        </div>
        <div class="s12 m6 l4">
          <div class="field label border">
            <input type="text" v-model="form.name_cont" />
            <label>{{ $t('name') }}</label>
          </div>
        </div>
        <div class="s12 m12 l4">
          <div class="field label border">
            <input type="text" v-model="form.brand_name_cont" />
            <label>{{ $t('clients.brand_name') }}</label>
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
const route = useRoute();
const router = useRouter();
const props = defineProps(['pagination']);

const form = ref({
  id_eq: route.query["q[id_eq]"],
  name_cont: route.query["q[name_cont]"],
  brand_name_cont: route.query["q[brand_name_cont]"]
});

const showFilters = ref(false)
const toggleForm = () => {
  showFilters.value = !showFilters.value
}
const searchQuery = () => {
  return '/api/admin/clients.xlsx?' + new URLSearchParams(route.query);
}
const search = () => {
  const query = Object.fromEntries(
    Object.entries(form.value).map(entry => [`q[${entry[0]}]`, entry[1]])
  );
  router.push({ path: route.path, query: query });
}
const reset = () => {
  form.value = { ...form.value, id_eq: '', name_cont: '', brand_name_cont: '' };
  router.push({ path: route.path, query: '' })
}
</script>
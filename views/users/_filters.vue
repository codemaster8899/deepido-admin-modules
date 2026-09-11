<template>
  <section class="filters">
    <div class="row-top">
      <a href="#" @click.prevent="toggleForm">
        <i :class="showFilters ? 'open' : 'closed'" class="tiny">keyboard_arrow_right</i>
        {{ $t('filter') }}
        <span v-if="props.pagination.count > 0">({{ props.pagination.count }} {{ $t('results', props.pagination.count)
          }})</span>
      </a>
      <a :href="searchQuery()"><i class="tiny">docs_apps_script</i>{{ $t('xls_export') }}</a>
    </div>

    <form @submit.prevent="search" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 m6 l2">
          <div class="field label border">
            <select v-model="form.role_eq">
              <option value="">{{ $t('all') }}</option>
              <option value="user">{{ $t('users.filterable_roles.user') }}</option>
              <option value="admin">{{ $t('users.filterable_roles.admin') }}</option>
            </select>
            <label>{{ $t('users.role') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.firstname_cont">
            <label>{{ $t('users.first_name') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.lastname_cont">
            <label>{{ $t('users.last_name') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.email_cont">
            <label>{{ $t('users.email') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.organisation_client_name_cont">
            <label>{{ $t('users.client') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.organisation_brand_name_cont">
            <label>{{ $t('users.brand') }}</label>
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
  role_eq: route.query["q[role_eq]"],
  firstname_cont: route.query["q[firstname_cont]"],
  lastname_cont: route.query["q[lastname_cont]"],
  email_cont: route.query["q[email_cont]"],
  organisation_client_name_cont: route.query["q[organisation_client_name_cont]"],
  organisation_brand_name_cont: route.query["q[organisation_brand_name_cont]"]
});

const showFilters = ref(false)
const toggleForm = () => {
  showFilters.value = !showFilters.value
}
const searchQuery = () => {
  return '/api/admin/users.xlsx?' + new URLSearchParams(route.query);
}
const search = () => {
  const query = Object.fromEntries(
    Object.entries(form.value).map(entry => [`q[${entry[0]}]`, entry[1]])
  );
  router.push({ path: route.path, query: query });
}
const reset = () => {
  form.value = { ...form.value, role_eq: '', firstname_cont: '', lastname_cont: '', email_cont: '', organisation_client_name_cont: '', organisation_brand_name_cont: '' };
  router.push({ path: route.path, query: '' })
}
</script>
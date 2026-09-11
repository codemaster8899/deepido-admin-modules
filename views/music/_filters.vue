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
      <a download class="link button transparent " :href="'/fr/api/admin/music.xlsx?q' + route.fullPath.split('?q')[1]">
        <i style="font-size: 19px; margin-bottom: 4px;">format_list_bulleted</i> {{ $t('xls_export') }}
      </a>
    </div>
    <form @submit.prevent="search" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 l3">
          <div class="field label border">
            <input type="date" v-model="form.created_at_gteq">
            <label>{{ $t('created_between_start') }}</label>
            <i>today</i>
          </div>
        </div>
        <div class="s12 l3">
          <div class="field label border">
            <input type="date" v-model="form.created_at_lteq">
            <label>{{ $t('created_between_stop') }}</label>
            <i>today</i>
          </div>
        </div>
        <div class="s12 l3">
          <div class="field label suffix border">
            <select v-model="form.tagged_with">
              <option value="">{{ $t('indifferent') }}</option>
              <option value="none">{{ $t('none') }}</option>
              <option value="any">{{ $t('music.tagged') }}</option>
            </select>
            <label>{{ $t('music.tagged') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div>
        <div class="s12 l3">
          <div class="field label suffix border">
            <select v-model="form.played_values">
              <option value="">{{ $t('indifferent') }}</option>
              <option value="never">{{ $t('music.never_played') }}</option>
              <option value="at_least_one">{{ $t('music.at_least_once') }}</option>
              <option value="at_least_ten">{{ $t('music.at_least_ten') }}</option>
              <option value="more_than_hundred">{{ $t('music.at_least_hundred') }}</option>
            </select>
            <label>{{ $t('music.played_count') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div>
        <div class="s12 l4">
          <div class="field label suffix border">
            <select v-model="form.validated_eq">
              <option value="">{{ $t('indifferent') }}</option>
              <option value="true">{{ $t('yes') }}</option>
              <option value="false">{{ $t('no') }}</option>
            </select>
            <label>{{ $t('music.validated') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div>
        <div class="s12 l4">
          <div class="field label border">
            <input type="text" v-model="form.artists_name_cont">
            <label>{{ $t('music.artist') }}</label>
          </div>
        </div>
        <div class="s12 l4">
          <div class="field label border">
            <input type="text" v-model="form.name_cont">
            <label>{{ $t('music.title') }}</label>
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
defineProps(['pagination'])
const router = useRouter();
const route = useRoute();

const showFilters = ref(false)
const form = ref({})

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

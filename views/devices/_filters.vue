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
        <a @click.prevent="exportXls" href="#">
          <i style="font-size: 19px; margin-bottom: 4px;">format_list_bulleted</i> {{ $t('xls_export') }}
        </a>
    </div>
    <form @submit.prevent="search" accept-charset="UTF-8" :class="showFilters ? '' : 'hidden'">
      <div class="grid">
        <div class="s12 l3">
          <div class="field label border">
            <input type="text" v-model="form.id_eq" />
            <label>{{ $t('ref') }}</label>
          </div>  
        </div>
        <div class="s12 l3">
          <div class="field label suffix border">
            <select v-model="form.os_in">
              <option value>{{ $t('all') }}</option>
              <option value="0,1,2,3">{{ $t('Shape::Deepibox') }}</option>
              <option value="4,5,6">{{ $t('Shape::SamsungScreen') }}</option>
              <option value="7,8,9">{{ $t('Shape::WebosScreen') }}</option>
            </select>
            <label>{{ $t('type') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div> 
        <div class="s12 l3">
          <div class="field label suffix border">
            <select v-model="form.status_eq">
              <option value>{{ $t('all') }}</option>
              <option value="0">{{ $t('device.stock') }}</option>
              <option value="1">{{ $t('device.assigned') }}</option>
              <option value="2">{{ $t('device.ready') }}</option>
              <option value="3">{{ $t('device.shipped') }}</option>
              <option value="4">{{ $t('device.active') }}</option>
              <option value="5">{{ $t('device.to_repair') }}</option>
              <option value="6">{{ $t('device.returned') }}</option>
              <option value="7">{{ $t('device.out_of_order') }}</option>
            </select>
            <label>{{ $t('status') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div>   
        <div class="s12 l3">
          <div class="field label border">
            <input type="text" v-model="form.serial_cont" />
            <label>{{ $t('device.serial') }}</label>
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
import useXlsx from '../../composable/useXlsx.js'

const props = defineProps(['pagination']);

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
    if (el === 'per') {
      query["per"] = form.value[el];
    } else if (el === 'os_in') {
      const segments = form.value[el].split(',');
      for (let id in segments) {
        query["q[os_in][]"] = segments;
      }
    } else {
      query["q[" + el + "]"] = form.value[el];
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
const { exportXlsx } = useXlsx();
const exportXls = () => {
  exportXlsx("/xlsx", { klass: 'Device', query: route.query })
}


onMounted(() => {
  for (const key in route.query) {
    form.value[key.slice(2, -1)] = route.query[key]
  }
})
</script>

<template>

  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{ name: 'devices' }">{{ $t('main_nav.devices') }}</router-link></li>
      <li>{{ route.params.id }}</li>
    </ul>
    <div v-if="store.device.status === 'shipped'" class="content">
      <div class="responsive">
        <div style="padding: 100px">
          <h3>{{ $t('device.shipping_in_progress') }}</h3>
        </div>
      </div> 
    </div>
    <div class="grid responsive" v-else>
      <div class="content s12 l4">
        <form  @submit.prevent="update" accept-charset="UTF-8" class="form" :class="store.progress">
          <div class="field label suffix border">
              <select v-model="store.device.status">
                <option v-for="status in store.device.available_status" :value="status.name" :key="status.name">{{
                  $t(`device.${status.name}`) }}
                </option>
              </select>
            <label>{{ $t('status') }}</label>
            <i>arrow_drop_down</i>
            <SharedErrors class="helper" attr="status" :messages="store.errors" />
          </div>
          <div class="field label border">
            <input type="text" v-model="store.device.serial" />
            <label>{{ $t('device.serial') }}*</label>
            <SharedErrors attr="serial" :messages="store.errors" />
          </div>
          <div class="field label suffix border">
            <select v-model="store.device.os">
              <option v-for="os in store.device.oses" :value="os.name" :key="os.name">{{ $t(os.name) }}</option>
            </select>
            <label>{{ $t('device.os') }}*</label>
            <i>arrow_drop_down</i>
            <SharedErrors class="helper" attr="os" :messages="store.errors" />
          </div> 
          <div class="field label suffix border">
            <select v-model="store.device.manufacturer_id">
              <option v-for="manufacturer in store.device.manufacturers" :value="manufacturer.id" :key="manufacturer.id">{{ manufacturer.name }}</option>
            </select>
            <label>{{ $t('device.manufacturer') }}</label>
            <i>arrow_drop_down</i>
            <SharedErrors class="helper" attr="manufacturer" :messages="store.errors" />
          </div>
          <div class="field label suffix border">
            <select v-model="store.device.batch_id">
              <option v-for="batch in store.device.batches" :value="batch.id" :key="batch.id">{{ batch.name }}</option>
            </select>
            <label>{{ $t('batches.batch') }}*</label>
            <i>arrow_drop_down</i>
          </div>   
          <div class="field label suffix border">
            <select v-model="store.device.shape_id" class="form-control">
              <option v-for="shape in store.device.shapes" :value="shape.id" :key="shape.id">{{ shape.name }}</option>
            </select>
            <label>{{ $t('device.model') }}*</label>
            <i>arrow_drop_down</i>
            <SharedErrors class="helper" attr="batch" :messages="store.errors" />
          </div>
          <div class="align-right">
            <button class="progress" :class="store.progress ? store.progress : ''" >{{$t('save')}}</button>
          </div>
        </form>
      </div>
      <div class='s12 l8'>
        <h5 style="margin-bottom: 10px;">Historique</h5>
        <table class="table table-striped table-thin">
          <thead>
            <tr>
              <th style="width: 100px">{{ $t('device.spot_id') }}</th>
              <th style="width: 150px">{{ $t('status') }}</th>
              <th style="width: 150px">{{ $t('date') }}</th>
              <th>{{ $t('device.localisation') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in store.events" :key="event.uid">
              <td style="width: 100px; vertical-align: top; padding: 5px;"><router-link
                  :to="'/spots/' + event.spot_id">{{ event.spot_id }}</router-link></td>
              <td style="width: 100px; vertical-align: top; padding: 5px;">{{ event.status }}</td>
              <td style="width: 100px; vertical-align: top; padding: 5px;">{{ event.date }}</td>
              <td style="padding: 5px;">{{ event.location }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h5>Commentaires</h5>
        <form @submit.prevent="update" accept-charset="UTF-8" :class="store.progress" class="form styled-form content" style="padding: 10px">
          <div class="field textarea border textarea-box">
            <textarea v-model="store.device.comment"></textarea>
          </div>    
          <div class="align-right">
            <button class="progress" :class="store.progress ? store.progress : ''" >{{$t('save')}}</button>             
          </div>      
        </form>
      </div>        
    </div>    
  </main>
</template>

<script setup>
import { DeviceStore } from "../../stores/device"

const store = DeviceStore()
const route = useRoute()

onMounted(() => {
  store.edit(route.params.id)
})

const update = () => {
  store.update(store.device)
}
</script>

<style scoped>
th {
  max-inline-size: inherit;
}
.align-right {
  display: flex;
  justify-content: end;
  width: 100%;
}
.textarea-box {
  min-height: 200px; 
  margin-bottom: 10px !important;
}
.align-right button {
  margin-right: 0 !important;
}
</style>

<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{ name: 'devices' }">{{ $t('main_nav.devices') }}</router-link></li>
      <li>{{ $t('device.new_device') }}</li>
    </ul>
    <div class="content">
      <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form" :class="store.progress">
        <device-form></device-form>
      </form>
    </div>
  </main>
</template>

<script setup>
import DeviceForm from "./_form.vue";
import { DeviceStore } from "../../stores/device"

const store = DeviceStore()

const create = () => {
  store.create()
}

onMounted(() => {
  store.new()
})


//   beforeRouteLeave(to, from, next) {
//     this.$store.dispatch("DeviceStore/scannerStop").then(response => {
//       next();
//     });
//   },

//   watch: {
//     scanEvents: function () {
//       this.$store.dispatch("DeviceStore/create", this.device);
//     }
//   }
</script>

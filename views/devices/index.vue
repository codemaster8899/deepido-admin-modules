<template>
  <main class="responsive max">
    <ul class="tabs-container">
      <li class="active"><a href="#">{{ $t('main_nav.devices') }}</a></li>
      <li><router-link  to="/addons">{{ $t('device.addons') }}</router-link></li>
      <li><router-link  to="/shapes">{{ $t('shapes.title') }}</router-link></li>
    </ul>
    <router-link :to="'/devices/new'" class="button tertiary pull-right">
      <b>{{ $t('device.add_device') }}</b>
    </router-link>    

    <div class="content">
        <filters :pagination="store.pagination"></filters>
        <table class="stripes large-space table-contacts">
          <thead>
            <tr>
              <th style="width: 70px;">{{ $t('ref') }}</th>
              <th style="width: 140px;">{{ $t('type') }}</th>
              <th style="width: 100px;">{{ $t('status') }}</th>
              <th style="width: 100px;">{{ $t('device.os') }}</th>
              <th style="width: 200px;">{{ $t('device.serial') }}</th>
              <th style="width: 200px;">{{ $t('device.model') }}</th>
              <th>{{ $t('device.localisation') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in store.devices" :key="device.id">
              <td>
                <router-link class="link" :to="'/devices/' + device.id + '/edit'">{{ device.id }}</router-link>
              </td>
              <td>{{ $t(device.shape.type) }}</td>
              <td>
                <span v-if="device.status == 'ready'">
                  <a class="link" @click.prevent="setShipped(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                </span>
                <span v-else-if="device.status == 'returned'">
                  <a @click.prevent="modalRepair(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                </span>
                <span v-else-if="device.status == 'to_repair'">
                  <a @click="modalRepair(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                </span>
                <span v-else>{{ $t(`device.${device.status}`) }}</span>
              </td>
              <td>{{ $t(`${device.os}`) }}</td>
              <td>{{ device.serial }}</td>
              <td>{{ device.shape.name }}</td>
              <td>{{ device.location }}</td>
            </tr>
          </tbody>
        </table>
        <SharedPagination v-if="store.pagination" :store="store" @clicked="fetchData" />
    </div>
  </main>
</template>

<script setup>
import { DeviceStore } from "../../stores/device"
import filters from "../devices/_filters.vue";
import SharedPagination from '../shared/_pagination.vue';



const store = DeviceStore()
const route = useRoute()
const router = useRouter()

const fetchData = () => {
  console.log("route", route);
  store.index(route.fullPath)
}

const setShipped = (device) => {
  device.status = "shipped"
  store.update({
    id: device.id,
    status: "shipped"
  })
}

onMounted(() => {
  fetchData()
})
// export default {

//   methods: {
//     setRepair: function (device) {
//       device.status = "to_repair";
//       this.$store.dispatch("DeviceStore/update", {
//         id: device.id,
//         status: "to_repair"
//       });
//     },
//     setStock: function (device) {
//       device.status = "to_repair";
//       this.$store.dispatch("DeviceStore/update", {
//         id: device.id,
//         status: "stock"
//       });
//     },
//     modalRepair: function (device) {
//       this.$store.commit("DeviceStore/one", { device: device });
//       $("#modalRepair").modal();
//     }
//   }
// };
</script>

<style scoped>
th {
  max-inline-size: inherit;
}
.pull-right {
  position: absolute;
  right: 0;
  top: 10px;
}
.tabs-container {
  margin-top: 22px;
}
</style>

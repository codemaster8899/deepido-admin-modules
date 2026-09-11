<template>
  <div class="grid responsive">
    <div class="s12 l4">
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
      <button class="pull-right progress" :class="store.progress ? store.progress : ''" >{{$t('create')}}</button>
    </div>
    <div class="s12 l8">
      <div v-if="store.newDevices.length > 0" style="padding-left: 20px;">
        <table class="table table-striped table-thin">
          <thead>
            <tr>
              <th>{{ $t('ref') }}</th>
              <th>{{ $t('type') }}</th>
              <th>{{ $t('device.serial') }}</th>
              <th>{{ $t('device.os') }}</th>
              <th>{{ $t('device.manufacturer') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="newDevice in store.newDevices" :key="newDevice.id">
              <td>{{ newDevice.id }}</td>
              <td>{{ newDevice.shape.type }}</td>
              <td>{{ newDevice.serial }}</td>
              <td>{{ newDevice.os }}</td>
              <td>{{ newDevice.shape.brand }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div class="col-xs-24 col-md-14 col-md-offset-2" style="padding-left: 20px;">
        <h4>{{ $t('device.scan_qr') }}</h4>

        <div class="qrcode-scanner" id="qrcode-scanner">
          <video ref="webcam"></video>
          <canvas ref="preview"></canvas>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { DeviceStore } from "../../stores/device"
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";

const store = DeviceStore()
// export default {
//   data: function () {
//     return this.$store.state.DeviceStore;
//   },

  // mounted: function () {
  //   const video = this.$refs.webcam;
  //   const canvasElement = this.$refs.preview;

  //   navigator.mediaDevices
  //     .getUserMedia({ video: { facingMode: "environment" } })
  //     .then(stream => {
  //       this.$store.commit("DeviceStore/setStream", stream);
  //       let canvas = canvasElement.getContext("2d");
  //       video.srcObject = stream;
  //       video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  //       video.play();

  //       this.$store.commit(
  //         "DeviceStore/setCameraInterval",
  //         setInterval(() => {
  //           if (video.readyState === video.HAVE_ENOUGH_DATA) {
  //             canvasElement.height = video.videoHeight;
  //             canvasElement.width = video.videoWidth;
  //             canvas.drawImage(
  //               video,
  //               0,
  //               0,
  //               canvasElement.width,
  //               canvasElement.height
  //             );
  //             var imageData = canvas.getImageData(
  //               0,
  //               0,
  //               canvasElement.width,
  //               canvasElement.height
  //             );
  //             var code = jsQR(
  //               imageData.data,
  //               imageData.width,
  //               imageData.height,
  //               {
  //                 inversionAttempts: "dontInvert"
  //               }
  //             );

  //             if (code && code != "") {
  //               this.$store.commit("DeviceStore/serialScanned", code.data);

  //               $("#qrcode-scanner").addClass("active");
  //               setTimeout(function () {
  //                 $("#qrcode-scanner").removeClass("active");
  //               }, 1000);
  //             }
  //           }
  //         }, 1000)
  //       );
  //     });
  // }
// };
</script>

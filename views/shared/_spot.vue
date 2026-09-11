<template>
  <!-- External route to Front end -->
  <a class="player-pack" :href="'/fleet/spots/' + spot.id">
    <i>{{ player_icon }}</i>{{ spot.device_id }}<span :class="'player-status ' + current_status"></span>
  </a>
</template>

<script setup>
const props = defineProps(['attr', 'spot']);
const cable = inject('cable');
let current_status = ref(props.spot.status);

const player_icon = computed(() => {
  let icon = 'music_note';
  switch (props.spot.icon) {
    case 'icon-note-beamed':
      icon = 'music_note';
      break;
    case 'icon-soc-vertical':
      icon = 'crop_portrait';
      break;
    case 'icon-soc-horizontal':
      icon = 'crop_portrait';
      break;
    case 'icon-screen-vertical':
      icon = 'splitscreen_portrait';
      break;
    case 'icon-screen-horizontal':
      icon = 'smart_display';
      break;
    default:
      console.log(props.spot.icon)
      icon = '';
      break;
  }

  return icon;
})

onMounted(() => {
  cable.on('PlatformChannel', (event) => {
    if (event.spot.do === 'statusChanged' && event.spot.id === props.spot.id) {
      current_status.value = event.spot.status ? 'ok' : 'ko';
    }
  })
});

// Admitting the first top Spot is showing 11999, use this to change color:
// - Open up a Rails console: "make rails do=c" from a terminal
// - Copy/paste this line:
// ActionCable.server.broadcast("PlatformChannel", { spot: { id: 16726, do: 'statusChanged', status: false } })
// You can move from green to red color by toggling status between true/false 
</script>

<style>
.player-pack {
  text-decoration: none;
  border: 1px solid rgb(0, 204, 203);
  color: rgb(0, 204, 203);
  background-color: rgb(75, 75, 75);
  padding: 0 5px;
  padding-top: 2px;
  border-radius: 3px;
  height: 24px;
  line-height: 10px;
  width: 90px;
  display: inline-block;
  text-align: right;

  &:hover {
    background-color: rgb(0, 204, 203);
    color: rgb(255, 255, 255);
  }

  i {
    position: absolute;
    left: 0;
    top: -1px;
    font-size: 18px;
  }

  .player-status {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 4px;

    &.ok {
      background-color: rgb(14, 116, 72);
    }

    &.ko {
      background-color: rgb(198, 8, 19);
    }

    &.warning {
      background-color: rgb(243, 149, 10);
    }

    &.ready {
      background-color: #ddd;
    }
  }
}
</style>
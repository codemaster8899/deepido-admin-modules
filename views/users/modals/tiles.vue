<template>
  <div class="dialog-code">
    <div class="overlay"></div>
    <dialog class="modal" id="modal-widgets">
      <h5>{{ $t('users.widgets') }}</h5>

      <form @submit.prevent="save">
        <div class="field label border">
          <input type="text" class="form-control" v-model="Store.tile.name">
          <label>{{ $t('name') }}</label>
          <br />
        </div>
        <div class="field label border">
          <select v-model="Store.tile.type">
            <option value=""></option>
            <option v-for="value, key in Store.tiles" :value="key" :key="key">{{ value }}</option>
          </select>
          <label>{{ $t('users.widget_type') }}</label>
          <i>arrow_drop_down</i>
        </div>
        <div class="field label border">
          <input type="number" class="form-control" v-model="Store.tile.expiration">
          <label>{{ $t('users.widget_timeout') }}</label>
        </div>

        <nav class="middle-align">
          <a class="button transparent link" data-ui="#modal-widgets">{{ $t('cancel') }}</a>
          <button class="button primary" data-ui="#modal-widgets">{{ $t('save') }}</button>
        </nav>
      </form>

    </dialog>
  </div>
</template>

<script setup>
import { UserStore } from "../../../stores/user.js";
const Store = UserStore();
const { t } = useI18n();
const Route = useRoute();

const edit = function (tile) {
  Store.tile = tile;
}
const create = function () {
  Store.addTile().then(() => {
    Store.show(Route.params.id);
  }).catch(() => {
    alert('error');
  })
}
const update = function () {
  Store.updateTile().then(() => {
    Store.show(Route.params.id);
  }).catch(() => {
    alert('error');
  })
}
const save = function () {
  if (Store.tile.id === null) {
    create()
  } else {
    update()
  }
}
const destroy = function (tile) {
  if (confirm(t('confirm'))) {
    Store.destroyTile(tile.id).then(() => {
      Store.show(Route.params.id);
    }).catch(() => {
      alert('error');
    })
  }
}

defineExpose({
  edit,
  destroy
});
</script>

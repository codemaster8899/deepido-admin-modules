<template>
  <div class="dialog-code">
    <div class="overlay"></div>
    <dialog class="modal" id="modal-options">
      <h5>{{ $t('users.options') }}</h5>

      <form @submit.prevent="create">
        <div class="field label border">
          <select v-model="Store.option.name">
            <option v-for="value, key in Store.options" :value="key" :key="key">{{ value }}</option>
          </select>
          <label>{{ $t('users.select_option') }}</label>
          <i>arrow_drop_down</i>
        </div>
        <nav>
          <a class="button transparent link" data-ui="#modal-options">{{ $t('cancel') }}</a>
          <button class="button primary" data-ui="#modal-options">{{ $t('save') }}</button>
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

const create = function () {
  Store.addOption(Store.user.id).then(() => {
    Store.show(Route.params.id);
  }).catch(() => {
    alert('error');
  })
}

const destroy = function (option) {
  if (confirm(t('confirm'))) {
    Store.destroyOption(option.id).then(() => {
      Store.show(Route.params.id);
    }).catch(() => {
      alert('error');
    })
  }
}

defineExpose({
  destroy
});
</script>
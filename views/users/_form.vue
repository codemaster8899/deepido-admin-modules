<template>
  <div class="grid responsive">
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="Store.user.kind">
          <option value="User::Basic">{{ $t('users.filterable_roles.user') }}</option>
          <option value="User::Admin">{{ $t('users.filterable_roles.admin') }}</option>
        </select>
        <label for="">{{ $t('users.role') }}</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field label border">
        <input type="text" v-model="Store.user.firstname">
        <label>{{ $t('users.first_name') }}*</label>
        <SharedErrors attr="firstname" :messages="Store.errors" />
      </div>
      <div class="field label border">
        <input type="text" v-model="Store.user.lastname">
        <label>{{ $t('users.last_name') }}*</label>
        <span class="error">{{ Store.errors.lastname }}</span>
      </div>
      <div class="field label border">
        <select v-model="Store.user.language">
          <option v-for="locale in Store.user.available_locales" :key="locale.name" :value="locale.name">{{ locale.name
            }}</option>
        </select>
        <label>{{ $t('users.language') }}</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field label border">
        <input type="text" v-model="Store.user.email" disabled>
        <label>{{ $t('users.email') }}</label>
      </div>
      <article v-if="Store.user.tiles.length > 0" class="transparent no-border" style="padding-top: 0;">
        <b>{{ $t('users.available_widgets') }}</b>
        <ul class="list">
          <li v-for="tile in Store.user.tiles" :key="tile.id">
            <a href="#" @click.prevent="editTile(tile)" data-ui="#modal-widgets">{{ tile.name }}</a>
            <a href="#" class="cross" style="float: right" @click.prevent="destroyTile(tile)"></a>
          </li>
        </ul>
      </article>
      <div class="field">
        <a href="#" class="button small-round border" data-ui="#modal-widgets">{{ $t('users.add_widget') }}</a>
      </div>
      <div class="field">
        <a href="#" @click.prevent="sendNotification" class="button small-round border">{{
          $t('users.notify_playlist_update') }}</a>
      </div>
    </div>

    <div class="s12 l6">
      <div class="field label border">
        <select v-model="Store.user.brand_id">
          <option value="null">{{ $t('users.no_reseller') }}</option>
          <option v-for="brand in Store.user.available_brands" :key="brand.id" :value="brand.id">{{ brand.name }}
          </option>
        </select>
        <label for="">{{ $t('users.reseller_for') }}</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field label border">
        <select v-model="Store.user.manufacturer_id">
          <option value="null">{{ $t('users.no_assembler') }}</option>
          <option v-for="manufacturer in Store.user.available_manufacturers" :key="manufacturer.id"
            :value="manufacturer.id">{{ manufacturer.name }}</option>
        </select>
        <label for="disk_space">{{ $t('users.assembler_for') }}</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field middle-align">
        <label class="switch">
          <input type="checkbox" v-model="Store.user.hq_videos" />
          <span></span>
        </label>
        <span>{{ $t('users.hd_uploads') }}</span>
      </div>
      <div class="field label border">
        <input type="text" class="form-control" v-model="Store.user.api_token" disabled="true" />
        <label for="disk_space">{{ $t('users.events_api_token') }}</label>
      </div>
      <div class="field label border">
        <input type="text" v-model="Store.user.organisation_name" disabled>
        <label>{{ $t('organisation') }}</label>
      </div>
      <article v-if="Store.user.options.length > 0" class="transparent no-border" style="padding-top: 0;">
        <b>{{ $t('users.options') }}</b>
        <ul class="list">
          <li v-for="option in Store.user.options" :key="option.id">{{ option.name }}<a href="#" class="cross"
              style="float: right;" @click.prevent="destroyOption(option)"></a></li>
        </ul>
      </article>
      <div class="field">
        <a href="#" class="button small-round border" data-ui="#modal-options">{{ $t('users.add_option') }}</a>
      </div>
      <div class="field">
        <a v-if="Store.user.deleted" href="#" @click.prevent="reactivate" class="button primary border">{{
          $t('users.reactivate') }}</a>
      </div>
    </div>

    <ModalsOptions ref="optionsForm" />
    <ModalsTiles ref="tilesForm" />
  </div>
</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import ModalsOptions from "./modals/options.vue";
import ModalsTiles from "./modals/tiles.vue";

import { UserStore } from "../../stores/user.js";
const Store = UserStore();
const { t } = useI18n();

const optionsForm = ref();
const destroyOption = function (option) {
  optionsForm.value.destroy(option);
}

const tilesForm = ref();
const editTile = function (tile) {
  tilesForm.value.edit(tile);
}
const destroyTile = function (tile) {
  tilesForm.value.destroy(tile);
}

const sendNotification = function () {
  if (confirm(t('confirm'))) {
    Store.sendNotification(Store.user.id).then(() => {
      window.location.reload();
    }).catch(() => {
      alert('error');
    })
  }
}

const reactivate = function () {
  if (confirm(t('confirm'))) {
    Store.reactivate().then(() => {
      window.location.reload();
    })
  }
}
</script>

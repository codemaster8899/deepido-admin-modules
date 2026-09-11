<template>
  <div class="grid responsive">
    <div class="s12 l6">
      <div class="field label border">
        <input type="text" v-model="Store.client.name" />
        <label>{{ $t('name') }}*</label>
        <SharedErrors attr="name" :messages="Store.errors" />
      </div>
      <div v-if="Store.client.id == null" class="field label border">
        <select v-model="Store.client.organisation_id">
          <option v-for="organisation in Store.organisations" :key="organisation.id" :value="organisation.id">
            {{ organisation.name }}
          </option>
        </select>
        <label>Organisation parente</label>
        <i>arrow_drop_down</i>
      </div>
      <div v-else class="field label border">
        <input type="text" v-model="Store.client.parent_organisation_name" disabled="true" />
        <label>Organisation parente</label>
      </div>
      <div class="field label border" v-if="Store.client.id != null">
        <input type="text" v-model="Store.client.api_uid" disabled="true" />
        <label>API UID</label>
        <!-- <a @click="initApi()">Générer</a> -->
      </div>
    </div>
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="Store.client.fallback_id">
          <option v-for="fallback in Store.fallbacks" :key="fallback.id" :value="fallback.id">{{ fallback.name }}
          </option>
        </select>
        <label>Fallback audio</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field label border">
        <select v-model="Store.client.brand_id">
          <option v-for="brand in Store.brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
        </select>
        <label>Marque</label>
        <i>arrow_drop_down</i>
      </div>
      <div v-if="Store.client.id == null">
        <label class="checkbox">
          <input type="checkbox">
          <span></span>
        </label>
        <b>Importer les modèles de template</b>
        <p>En cochant cette case tous les templates de l'organisation DEEPIDOO SIEGE [Bureaux] taggés "Modèle de
          templates"
          seront copiés dans la nouvelle organisation</p>
      </div>
      <div class="field label border" v-if="Store.client.id != null">
        <input type="text" v-model="Store.client.api_secret" disabled="true" />
        <label>API Secret</label>
      </div>
      <div class="field label border" v-if="Store.client.id != null">
        <select v-model="Store.client.sso_provider">
          <option value="">Pas de SSO</option>
          <option value="okta">Okta</option>
          <option value="ldap">LDAP</option>
        </select>
        <label>SSO Provider (Single Sign-On)</label>
        <i>arrow_drop_down</i>
      </div>
    </div>
  </div>

  <modals-destroy />
</template>

<script setup>
import ModalsDestroy from "./modals/destroy.vue";
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import { ClientStore } from '@/javascript/admin/stores/client';
const Store = ClientStore();
</script>

<template>
  <div class="dialog-code">
    <div class="overlay"></div>
    <dialog class="modal" id="modal-destroy">
      <div ref="warning">
        <h5>ATTENTION</h5>
        <p>Vous êtes sur le point de supprimer un client. <b>Toutes</b> Les données de ce client seront supprimées de
          façon irreversible :</p>

        <form v-on:submit.prevent="destroy" id="destroyPrompt" accept-charset="UTF-8" class="form">
          <ul style="padding: 20px">
            <li>Organisations</li>
            <li>Playlists</li>
            <li>Plannings, calendriers</li>
            <li>Médias</li>
            <li>Sites</li>
            <li>Utilisateurs</li>
            <li>Etc, etc...</li>
          </ul>

          <div class="field label border">
            <input type="text" class="form-control" v-model="Store.confirm_name">
            <label>Taper le nom du client pour confirmer</label>
          </div>

          <nav>
            <a class="button transparent link" data-ui="#modal-destroy">{{ $t('cancel') }}</a>
            <button class="button error">Supprimer définitivement</button>
          </nav>
        </form>
      </div>

      <div ref="progress" class="hidden center-align">
        <br />
        <progress class="circle large"></progress>
        <br />
        <br />
        <strong>Suppression en cours...</strong>
      </div>

      <div ref="errors" class="hidden center-align">
        <p>{{ error_messages }}</p>
        <br />
        <a class="button transparent link" data-ui="#modal-destroy">{{ $t('close') }}</a>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const { t } = useI18n();
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { ClientStore } from '@/javascript/admin/stores/client';
const Store = ClientStore();
const warning = ref(null);
const progress = ref(null);
const errors = ref(null);
const error_messages = ref("")

const destroy = () => {
  if (Store.client.name === Store.confirm_name) {
    warning.value.classList.add('hidden');
    progress.value.classList.remove('hidden');
    errors.value.classList.add('hidden');

    Store.destroy(route.params.id)
      .then(() => {
        router.push({ name: 'clients' });
      })
      .catch((error) => {
        error_messages.value = error.response.data.errors.nuke[0];

        warning.value.classList.add('hidden');
        progress.value.classList.add('hidden');
        errors.value.classList.remove('hidden');
      })
  } else {
    alert("Le nom ne correspond pas !");
  }
}
</script>

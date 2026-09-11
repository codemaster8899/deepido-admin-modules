<template>
  <div class="grid responsive">
    <div class="s12 l6">
      <div class="field label border">
        <input type="text" v-model="Store.contact.firstname" />
        <label>{{ $t('users.first_name') }}*</label>
        <SharedErrors attr="firstname" :messages="Store.errors" />
      </div>

      <div class="field label border">
        <input type="text" v-model="Store.contact.lastname" />
        <label>{{ $t('users.last_name') }}</label>
        <SharedErrors attr="lastname" :messages="Store.errors" />
      </div>

      <div class="field label border">
        <textarea v-model="Store.contact.notes" />
        <label>{{ $t('notes') }}</label>
        <span class="error">{{ errors.notes }}</span>
      </div>
    </div>
    <div class="s12 l6">
      <div class="field label border">
        <input type="text" v-model="Store.contact.email" />
        <label>{{ $t('users.email') }}</label>
        <SharedErrors attr="email_or_phone" :messages="Store.errors" />
      </div>

      <div class="field label border">
        <input type="text" class="intl-input" ref="phoneInput" @blur="setPhone" />
      </div>

      <div class="grid">
        <div class="l3">
          <div class="field label border">
            <select v-model="Store.contact.contactable_type" @change="resetContactable">
              <option value="Client">{{ $t('clients.singular') }}</option>
              <option value="Site">{{ $t('sites.singular') }}</option>
              <option value="">{{ $t('contacts.unlinked') }}</option>
            </select>
            <label>{{ $t('contacts.linked_to') }}</label>
            <i>arrow_drop_down</i>
          </div>
        </div>
        <div class="l9">
          <div class="field label border">
            <input type="text" v-model="Store.contact.contactable_name" @keyup="autocompleteContactable" />
            <label>{{ $t('contacts.entity') }}</label>
            <!-- <div class="autocomplete">
              <ul v-click-outside="clearContactables">
                <li v-for="contactable in contactables" :key="contactable.id">
                  <a href="#" @click.prevent="pickContactable(contactable)">{{ contactable.name }}</a>
                </li>
              </ul>
              <span class="error">{{ errors.contactable_target }}</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import { ContactStore } from '../../stores/contact'
const Store = ContactStore();

const phoneInput = ref()

onMounted(() => {
  Store.initPhone(phoneInput.value);
})

const errors = computed(() => Store.errors || {})

const setPhone = () => {
  Store.setPhone();
}

const autocompleteContactable = () => {
  // const payload = {
  //   keywords: contact.contactable_name,
  //   what: 'contactables',
  //   scope: contact.contactable_type,
  // }
  // contactStore.autocomplete(payload)
}

const clearContactables = (what) => {
  //contactStore.setContactables({ results: [] })
}

const pickContactable = (contactable) => {
  // contactStore.setContactable(contactable)
  // contactStore.setContactables({ results: [] })
}

const resetContactable = () => {
  //contactStore.setContactable({ id: null, name: '' })
}
</script>

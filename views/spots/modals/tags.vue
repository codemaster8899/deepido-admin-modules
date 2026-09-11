<template>
  <div>
    <table class="table tags-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th style="width: 100px">&nbsp;</th>
          <th style="width: 20px">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in tagsStore.tags" :key="tag.id" style="height: 45px">
          <td>
            <div>
              <span @click="toggle(tag.id)" class="tag" :style="'background-color: ' + tag.color">{{ tag.name }}</span>
            </div>
            <div class="edit-section" v-if="selectedTag === tag.id && showEditSection">
              <input type="text" class="tag-values" v-model="tag.name" />
              <input class="input-color" type="color" v-model="tag.color" />
            </div>            
          </td>
          <td>
            <div>
              <a href="#" v-if="selectedTag !== tag.id" @click.prevent="onEdit(tag.id)">Modifier</a>
            </div>
            <div v-if="selectedTag === tag.id " class="tag-item">
              <a href="#" @click.prevent="update($event, tag)">Enregistrer</a>
            </div>
          </td>
          <td>
            <a href="#" @click.prevent="destroy(tag.id)" style="text-decoration: none; color: red">×</a>
          </td>
        </tr>
      </tbody>
    </table>
    <a class="link" @click="toggleForm">+ Ajouter un Tag</a>
    <form v-if="showNewTegSection" class="form new-item" @submit.prevent="create">
      <div class="grid">
        <div class="field border l9">
          <input v-model="newTagData.name" type="text" placeholder="Nouveau tag">
        </div>      
        <input v-model="newTagData.color" type="color" class="l3 new-input-color" value="#dddddd"/>
      </div>
      <button type="submit" class="button btn-primary">Créer</button>
    </form>    
  </div>
</template>

<script setup>
  import { TagsStore } from "../../../stores/tags"
  const tagsStore = TagsStore()

  const selectedTag = ref(null)
  const showEditSection = ref(false)
  const showNewTegSection = ref(false)
  const newTagData = reactive({
    color: "#898989",
    name: ""
  })

  const onEdit = (id) => {
    if (!selectedTag.value && !showEditSection.value) {
      selectedTag.value = id 
      showEditSection.value = true
    } else if (selectedTag.value && showEditSection.value) {
      selectedTag.value = null 
      showEditSection.value = false
    }
  }
  const destroy = (id) => {
    if(confirm("Êtes vous sur ?!")) {
      tagsStore.destroy(id).then((res) => {
        tagsStore.index('device')
      })
    }
  }
  const update = (e, tag) =>  {
    const updated_tag = {
      id: tag.id,
      name: tag.name,
      color: tag.color
    }
    tagsStore.update(updated_tag)
    selectedTag.value = null 
    showEditSection.value = false
  }
  const toggleForm = () => {
    showNewTegSection.value = !showNewTegSection.value
  }
  const create = (e) => {
    tagsStore.create(newTagData).then(res => {
        tagsStore.index('device')
        showNewTegSection.value = false
    }).catch(error => {
      alert('Donnez un nom à votre Tag !');
    })
  }

  const toggle = (tag_id) => {
    // tagsStore.toggle(tag_id).then(res => {
    //   tagsStore.index('device')
    // })
    // this.$store.dispatch("TagStore/toggle", tag_id).then(response => {
    //   this.$emit('changed');
    // })
  }
</script>

<style scoped>
.tags-table {
  background: var(--surface-container-high);
}
.tag {
  padding: 1px 10px 0px 10px;
  display: flex;
  align-items: center;
  height: 22px;
  cursor: pointer;
  font-size: 12px;
  color: white;
}
.edit-section {
  display: flex;
  margin-top: 10px;
}
.input-color {
  width: 100%;
  position: relative;
  opacity: 1;
  height: 24px;
}

.new-input-color {
  width: 100%;
  position: relative;
  opacity: 1;
  height: 24px;
  height: 47px;
}
.new-item {
  margin-top: 10px;
}
.new-item .field {
  margin-bottom: 20px;
}
.new-item button {
  margin-left: 0;
}
</style>


import { defineStore } from "pinia";

export const SpotStore = defineStore("spots", {
  state: () => {
    return {
      spots: [],
      pagination: {},
      available_versions: [],
      tags: [],

      // errors: {},
      // progress: "",
    };
  },

  actions: {
    index(full_path) {
      this.Api.get(full_path).then((res) => {
        this.spots = res.data.spots;
        this.pagination = res.data.pagination;
        this.available_versions = res.data.available_versions;
      })
    },
    manage(params) {
      this.Api.post(`/spots/batch/manage`, params).then((res) => {
        alert("OK: Opération en cours...");
      }).catch(error => {
        alert("ERREUR: Opération refusée, un process du même type est déjà dans la queue depuis moins de 2 heures.\n\nCliquez sur \"Voir toutes les opérations en cours\" pour plus de détails")
      })
    },
    getTags(context, taggable_id) {
      this.Api.get("/tags?context=device").then(res => {
        this.spots = res.data.spots;
        this.tags = res.data.tags;
      }).catch(error => console.error(error))
    },
  },
});

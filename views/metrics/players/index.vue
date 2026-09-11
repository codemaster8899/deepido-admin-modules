<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li>{{ $t('main_nav.statistics') }}</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable">
          <li class="active"><router-link to="/metrics/players">{{ $t('players') }}</router-link></li>
          <li><router-link to="/metrics/users">{{ $t('main_nav.users') }}</router-link></li>
          <li><router-link to="/metrics/syncs">{{ $t('syncs') }}</router-link></li>
        </ul>

        <div class="row styled-form">
          <div class="col-xs-24 overflowable">

            <table class="table table-striped table-thin metrics-player">
              <thead>
                <tr>
                  <th style="width: 140px;">{{ $t('start') }}</th>
                  <th style="width: 140px;">{{ $t('end') }}</th>
                  <th>{{ $t('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="interaction in interactions" :key="interaction.id" :class="interaction.klass">
                  <td>{{ interaction.created_at }}</td>
                  <td>{{ interaction.ended_at }}</td>
                  <td>
                    <router-link v-if="interaction.ended_at != '--:--:--'" :to="'/metrics/players/' + interaction.id">{{
                      interaction.subject }}</router-link>
                    <span v-if="interaction.ended_at == '--:--:--'">{{ interaction.subject }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

export default {

  data: function () {
    return this.$store.state.MetricPlayerStore;
  },

  mounted: function () {
    this.$store.dispatch('MetricPlayerStore/index', this.$route.fullPath);
  }

}
</script>

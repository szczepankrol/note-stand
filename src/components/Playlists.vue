<template>
  <div>
    <div class="overview">
      <h1>Playlists</h1>
      <ul>

      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Playlists', 
    methods: {
    },
    computed: {
      ...mapGetters({
        songList: 'getAllSongs',
      })
    },
  }
</script>

<style lang="scss" scoped> 
  @import './src/assets/scss/_common.scss';
  
  .overview{
  }
</style>

<template>
  <div>
    <div class="overview">
      <h1>Songs</h1>
      <ul>
        <li v-for="song in songList">
          <router-link :to="{ name: 'song', params: { slug: song.slug }}">
            {{song.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Songs', 
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

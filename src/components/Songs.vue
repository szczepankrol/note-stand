<template>
  <div>
    <div class="overview">
      <h1>Songs</h1>
      <router-link :to="{ name: 'song', params: {slug: 'new', mode: 'edit'}}">Add song</router-link>

      <ul>
        <li v-for="song in songList">
          <router-link :to="{ name: 'song', params: { slug: song.slug, mode: 'view' }}">
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

<template>
  <div>
    <div class="top">
      <h1>Note stand</h1> 
      <div class="top__nav">
        <router-link :to="{ name: 'songs'}">Songs</router-link>
        <router-link :to="{ name: 'playlists'}">Playlists</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Top', 
    methods: {
    },
    computed: {
    },
  }
</script>

<style lang="scss"> 
  @import './src/assets/scss/_common.scss';

  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__left{
      flex-grow: 2;
    }
    h1{
      margin-bottom: 0;
    }
    &__nav{
      a{
        font-weight: bold;
        display: inline-block;  
        padding: 5px 0 5px 20px;
      }
      select{
        margin-left: 20px;
        display: inline-block;
      }
    }
  }
</style>

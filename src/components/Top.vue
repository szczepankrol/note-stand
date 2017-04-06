<template>
  <div>
    <div class="top">
      <h1>Note stand</h1> 
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

<style lang="scss" scoped> 
  @import './src/assets/scss/_common.scss';
   
  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
      margin-bottom: 0;
    }
  }
</style>

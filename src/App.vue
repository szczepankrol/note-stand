<template>
  <div id="app">
    <div class="page">
      <top class="page__header"></top>
      <router-view class=""></router-view>
    </div>
  </div>
</template>

<script>
  import Top from '@/components/Top.vue'
  export default {
    name: 'app',
    components: {
      Top
    },
  }
</script>

<style lang="scss">
 @import './src/assets/scss/_common.scss';

 *, *::before, *::after{
  box-sizing: border-box;
}
 
body, input, textarea{
  font-family: $font-family;
  line-height: 1.5;
  color: $color-black;
}

h1, h2, h3, h4, h5, h6{
  margin-top: 0;
  margin-bottom: 1em;
  line-height: 1.1;
}
a{
  text-decoration: none;
  color: $color-primary;
}

.button{
  background: none;
  border: none;
  display: inline-block;
  cursor: pointer;
  padding: 12px 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: $font-size-small;
  &--primary{
    background-color: $color-primary;
    color: #fff;
  }    
  &--gray{
    background-color: $color-gray-med;
    color: #fff;
  }
}

.page{
  max-width: $page-width;
  margin: 0 auto;
  &__header{
    margin: 5% 0 5%;
  }
  &__main{
    display: flex;
  }
  &__nav{
    width: 20%;
    padding-right: 50px;
  }
  &__content{
    width: 80%;
  }
}
</style>

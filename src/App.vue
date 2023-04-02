<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue';
  export default {
    name: 'App',
    components: {
      FooterGuide
    }
  }
</script>

<style lang="less">
  #app{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  .toast-other{
    font-size: 30px !important;
    line-height: 50px !important;
  }
  .toast-thumb{
    background-color: transparent !important;
    color: #FF623E !important;
  }
</style>

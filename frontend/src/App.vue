<template>
  <div class="bloc-page">
     <Navbar />
     <b-container fluid class="containerUnderNav p-0">
       <router-view/>
     </b-container>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar
  },
}
</script>

<style lang="scss">
// Import custom SASS variable overrides
@import 'assets/custom-vars.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

// General style overrides and custom classes
html, body, .bloc-page {
  min-height: calc(100vh - 66px);
}

body {
    background-image:
        linear-gradient(
            to right bottom, rgba($color: #122441, $alpha: 1),
            rgba($color: #122441, $alpha: 0.3)),
            url("../public/images/background_HD.jpg");
    background-position: 50% 50%;
    background-attachment: fixed;
    overflow-x: hidden;
}

a:hover {
  text-decoration: none;
}
.containerUnderNav {
  margin-top: 66px ; // à cause de navbar fixed
}

</style>

<template>
   <div class="bloc-page">
     <Navbar />
     <b-container>
       <router-view/>
     </b-container>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar
  }
}


</script>

<style lang="scss">

html, body, .bloc-page {
  min-height: 100vh;
}

</style>

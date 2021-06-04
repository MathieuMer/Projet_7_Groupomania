<template>
  <div>
    <Navbar />
    <Timeline />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Timeline from '@/components/Timeline.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Timeline
  }
}
</script>

<template>
  <div>
    <Timeline :key='$store.state.renderKey'/>
  </div>
</template>

<script>
// 
// @ is an alias to /src
import Timeline from '@/components/Timeline.vue'

export default {
  name: 'Home',
  components: {
    Timeline
  },
  data() {
        return {
 
        }
  },
}
</script>

<template>
    <div>
        <b-row align-h="center" class="m-0">
            <b-col cols="12" lg="4" class="m-0">
                <h1 class="text-center text-white">Panneau d'administration</h1>
                <div class="Admin__sousMenu text-center">
                    <b-button class="mt-3" @click="toggleDisplay = !toggleDisplay" variant="secondary">Switch Messages / Commentaires</b-button>
                </div>
                <div v-if="toggleDisplay">
                    <MessageSignaled :key='$store.state.renderKey'/>
                </div>
                <div v-else>
                    <CommentSignaled :key='$store.state.renderKey'/>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import MessageSignaled from "../components/MessageSignaled.vue";
import CommentSignaled from "../components/CommentSignaled.vue";

export default {
name: "Admin",
  components: {
    MessageSignaled,
    CommentSignaled
  },
  data() {
    return {
        toggleDisplay: true,

                

    };
  },

  computed: {
    
  },

  methods: {
      
  }

}
</script>

<style lang="scss" scoped>


h1 {
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 10px;
}
h2{
    color: white;
}
</style>
<template>
    <div>
        <b-row align-h="center" class="m-0">
            <b-col cols="11" lg="6" class="m-0">
                <h2 class="text-center">Panneau d'administration</h2>
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
        toggleDisplay: false,

                

    };
  },

  computed: {
    
  },

  methods: {
      
  }

}
</script>

<style>
h2{
    color: white;
}
</style>
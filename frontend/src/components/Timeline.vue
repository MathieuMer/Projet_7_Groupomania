<template>
  <b-container>
    <b-row class="justify-content-center">
      
      <b-col lg="6">
        <MessageCard
        v-for="message in messages"
        :key="message.index"
        :message="message"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MessageCard from "../components/MessageCard.vue";


export default {
  name: "Timeline",
  components: {
    MessageCard,
  },

  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },

  mounted() {
    // Passe l'userId de vueX, pour le remettre à jour au cas ou l'user revient sur le site et qu'il a toujours son token (session persistante)
    const userIdinVueX = this.$store.state.userId;
    this.$store.dispatch("getMessages", userIdinVueX);
  }
};
</script>

<style>
</style>
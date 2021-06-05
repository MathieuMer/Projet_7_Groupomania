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
    this.$store.dispatch("getMessages");
  },
};
</script>

<style>
</style>
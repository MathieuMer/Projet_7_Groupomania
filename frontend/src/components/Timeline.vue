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
import { mapState } from 'vuex';

export default {
  name: "Timeline",
  components: {
    MessageCard,
  },

  computed: {
    ...mapState(['userFirstname', 'userLastname']),

    messages() {
      return this.$store.state.messages;
    },
  },

  mounted() {
    this.$store.dispatch("getMessages");
  }
};
</script>

<style>
</style>
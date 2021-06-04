<template>
<div>
    <MessageCard v-for="message in messages" :key="message.id" :message="message"/>

</div>
  
</template>

<script>
import MessageCard from '../components/MessageCard.vue';

export default {
    name: "Timeline",
    components: {
        MessageCard
       
    },

    computed: {
        messages() {
            return this.$store.state.messages;
        },
    },

    mounted() {
        this.$store.dispatch('getMessages');
    }
}
</script>

<style>

</style>
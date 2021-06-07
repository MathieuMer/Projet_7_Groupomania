<template>
    <b-card
      :img-src="message.imageurl"
      img-bottom
      tag="article"
      class="mb-2"
    > 
      <div class="d-flex">
        <div>
          <b-avatar :img-src="message.User.avatar" size="5rem"></b-avatar>
        </div>
        <div>
          <p>{{ message.User.firstname }} {{ message.User.lastname }}</p>
          <p>{{ message.User.job }}</p>
          <p>{{ message.createdAt }}</p>
        </div>
      </div>

      <b-card-text> {{ message.content }} </b-card-text>

    </b-card>
</template>

<script>
export default {
  name: "MessageCard",
  props: ["message"],
};
</script>

<style>
</style>
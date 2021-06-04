<template>
   <b-card
    title="message.user.firstname"
    img-src="message.imageurl"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      {{ message.content }}
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</template>

<script>
export default {
    name: "MessageCard",
    props: ["message"]
}
</script>

<style>

</style>
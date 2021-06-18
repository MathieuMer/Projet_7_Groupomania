<template>
  <div class="CommentModule row d-flex flex-column p-2 mx-2 mb-2">
    <div class="d-flex justify-content-between pl-2 pr-2">
      <div class="d-flex align-items-center">
        <b-avatar
          variant="primary"
          :src="comment.User.avatar"
          size="3rem"
        ></b-avatar>
        <p class="m-0 pl-1">
          <router-link v-if="comment.User.id !== $store.state.userId" :to="{ name: 'User', params: { id: comment.User.id } }">{{ comment.User.firstname }} {{ comment.User.lastname }}</router-link>
          <router-link v-else :to="{ name: 'Me' }">{{ comment.User.firstname }} {{ comment.User.lastname }}</router-link>
        </p>
      </div>
      <b-button
        class="CommentModule__SupButton"
        v-if="(comment.User.id === $store.state.userId) || $store.state.isAdmin"
        variant="light"
        size="sm"
        @click="deleteComment(comment.id)"
        ><b-icon icon="trash-fill" variant="danger"></b-icon
      ></b-button>
      <b-button
        class="CommentModule__SupButton"
        v-if="(comment.User.id !== $store.state.userId) && !$store.state.isAdmin"
        variant="light"
        size="sm"
        @click="signalComment(comment.id)"
        ><b-icon icon="exclamation-triangle" variant="warning"></b-icon
      ></b-button>
    </div>
    <div class="pl-2 pt-1">
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentModule",

  props: {
    comment: { type: Object },
  },

  data() {
    return {};
  },
  methods: {
    deleteComment(commentId) {
      const data = {
        commentId: commentId,
      };
      console.log(data);
      this.$store
        .dispatch("deleteComment", data)
        .then(() => {
          this.$store.state.renderKey++;
        })
        .catch((err) => console.log(err));
    },
    signalComment(commentId) {
      const data = {
        commentId: commentId
      };
      this.$store.dispatch("signalComment", data)
      .then(() => {
        this.makeToast('Le commentaire a bien été signalé, il sera traité par un admin dès que possible');
      })
      .catch(err => console.log(err))
    },
    makeToast(message) {
        this.$bvToast.toast(message, {
          title: 'Groupomania Info',
          toaster: 'b-toaster-bottom-right'
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.CommentModule {
    border: 2px solid #ffffff25;
    border-radius: 2rem 1rem 2rem 1rem;
    box-shadow: inset -2px -10px 10px rgba($color: #ffffff, $alpha: 0.5);
    background-color: rgba($color: #ffffff, $alpha: 0.2);
}
.CommentModule__SupButton {
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

</style>
<template>
  <div class="CommentModule row d-flex flex-column mx-2 mt-2">
    <div class="d-flex justify-content-between pt-2 pl-2 pr-2">
      <div class="d-flex align-items-center">
        <b-avatar
          variant="primary"
          :src="comment.User.avatar"
          size="3rem"
        ></b-avatar>
        <p class="m-0 pl-1">
          <router-link :to="{ name: 'User', params: { id: comment.User.id } }"
            >{{ comment.User.firstname }}
            {{ comment.User.lastname }}</router-link
          >
        </p>
      </div>
      <b-button
      class="CommentModule__SupButton"
        v-if="comment.User.id === $store.state.userId"
        variant="light"
        size="sm"
        @click="deleteComment(comment.id)"
        ><b-icon icon="trash-fill" variant="danger"></b-icon
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
          const userIdinVueX = this.$store.state.userId;
          this.$store.dispatch("getMessages", userIdinVueX);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.CommentModule {
    border: 2px solid #D1515A;
    border-radius: 2rem 1rem 2rem 1rem;
    box-shadow: inset -5px -5px 5px rgba($color: #ffffff, $alpha: 0.3);
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
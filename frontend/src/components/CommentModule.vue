<template>
  <div class="CommentModule row d-flex flex-column p-2 mx-2 mb-2">
    <div class="d-flex justify-content-between px-1">
      <div class="d-flex align-items-center">
        <b-avatar
          class="CommentModule__Avatar"
          variant="primary"
          :src="comment.User.avatar"
          size="3.5rem"
        ></b-avatar>
        <div class="m-0 pl-2">
          <p class="CommentModule__userName m-0" v-if="comment.User.id !== $store.state.userId"><router-link :to="{ name: 'User', params: { id: comment.User.id } }">{{ comment.User.firstname }} {{ comment.User.lastname }}</router-link></p>
          <p class="CommentModule__userName m-0" v-else><router-link :to="{ name: 'Me' }">{{ comment.User.firstname }} {{ comment.User.lastname }}</router-link></p>
          <p class="CommentModule__formaDate m-0">{{ formatDate }}</p>
        </div>
      </div>
      <b-button
        class="CommentModule__Button"
        v-if="(comment.User.id === $store.state.userId) || $store.state.isAdmin"
        variant="transparent"
        size="sm"
        @click="deleteComment(comment.id)"
        aria-label="supprimer-commentaire"
        ><b-icon icon="trash-fill" font-scale="1.2" variant="secondary"></b-icon
      ></b-button>
      <b-button
        class="CommentModule__Button"
        v-if="(comment.User.id !== $store.state.userId) && !$store.state.isAdmin"
        variant="transparent"
        size="sm"
        @click="signalComment(comment.id)"
        aria-label="signaler-commentaire"
        ><b-icon icon="exclamation-triangle" font-scale="1.2" variant="secondary"></b-icon
      ></b-button>
    </div>
    <div class="CommentModule__content py-1">
      <p class="m-0">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
const moment = require('moment');
moment().format(); 
moment.locale('fr');

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

  computed: {
    formatDate() {
      // use moment.js
      const dateOfCreation = moment(this.comment.createdAt);
      const now = moment();
      const diff = moment.duration(now.diff(dateOfCreation)).as('hours');
        if (diff < 72 ) {
        return dateOfCreation.from(now);
      } else {
        return dateOfCreation.format("dddd Do MMMM YYYY à k:mm");
      }
    },
  }, 
};
</script>

<style lang="scss" scoped>
.CommentModule {
    border: 1px solid rgba($color: #ffffff, $alpha: 0.5);
    border-radius: 2rem 1rem 2rem 1rem;
    box-shadow: inset 3px 15px 10px rgba($color: #ffffff, $alpha: 0.5),
                inset -3px -5px 10px rgba($color: #000000, $alpha: 0.2);
    background-color: rgba($color: #ffffff, $alpha: 0.4);
}
.CommentModule__Button {
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #ffffff;
}
.CommentModule__content {
  padding-left: 4rem;
}
.CommentModule__formaDate {
  font-style: italic;
  font-size: 0.8rem;
}
.CommentModule__userName {
  font-weight: bold;
}


</style>
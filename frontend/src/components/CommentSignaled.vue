<template>
  <div>
    <h3 class="text-center">Commentaires signalés :</h3>
    <div class="px-2" v-for="item in this.$store.state.signaledComment" :key="item.index" :item="item">
        <table class="table table-primary table-bordered text-center">
      <tbody>
        <tr>
          <th scope="col">Avatar</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
        </tr>
        <tr>
          <td>
            <b-avatar
              variant="primary"
              :src="item.User.avatar"
            ></b-avatar>
          </td>
          <td>{{ item.User.lastname }}</td>
          <td>{{ item.User.firstname }}</td>
        </tr>
        <tr>
          <th scope="col" colspan="3">Contenu</th>
        </tr>
        <tr>
          <td colspan="3">{{ item.content }}</td>
        </tr>
        <tr>
          <th scope="col" colspan="2">Enlever le signalement</th>
          <th scope="col" colspan="1">Supprimer</th>
        </tr>
        <tr>
          <td colspan="2">
            <b-button
              class="CommentModule__SupButton mx-auto"
              variant="light"
              size="sm"
              @click="deleteSignal(item.id)"
              ><b-icon icon="check2" variant="success"></b-icon
            ></b-button>
          </td>
          <td colspan="1">
            <b-button
              class="CommentModule__SupButton mx-auto"
              variant="light"
              size="sm"
              @click="deleteComment(item.id)"
              ><b-icon icon="trash-fill" variant="danger"></b-icon
            ></b-button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentSignaled",
  data() {
    return {
      renderKey: this.$store.state.renderKey
    };
  },

  methods: {
    init() {
        this.$store.dispatch("getSignaledComment")
    },
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
    deleteSignal(commentId) {
    const data = {
        commentId: commentId,
      };
      console.log(data);
      this.$store
        .dispatch("deleteSignalComment", data)
        .then(() => {
            this.$store.state.renderKey++;
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.init() 
  },
};
</script>


<style scoped lang="scss">
.CommentModule {
  border: 2px solid #d1515a;
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

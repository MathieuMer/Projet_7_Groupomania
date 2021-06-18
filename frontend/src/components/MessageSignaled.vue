<template>
  <div>
    <h2 class="text-center text-white py-3">Messages signalés :</h2>
    <p v-if="this.$store.state.signaledMessage.length == 0" class="text-center text-white">Il n'y a aucun message signalé pour le moment.</p>
    <div class="px-2" v-for="item in this.$store.state.signaledMessage" :key="item.index" :item="item">
        <table class="table table-transparent tablebordered text-center text-white">
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
          <td colspan="3">
            <p>{{ item.content }}</p>
            <p v-if="item.imageurl == null">Aucune image pour ce post</p>
            <div v-else>
              <b-img :src="item.imageurl" fluid alt="Responsive image"></b-img>
            </div>
          </td>
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
              @click="deleteMessage(item.id)"
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
  name: "MessageSignaled",
  data() {
    return {
      renderKey: this.$store.state.renderKey
    };
  },

  methods: {
    init() {
        this.$store.dispatch("getSignaledMessage")
    },
    deleteMessage(messageId) {
    const data = {
        id: messageId,
      };
      console.log(data);
      this.$store
        .dispatch("deleteMessage", data)
        .then(() => {
            this.$store.state.renderKey++;
        })
        .catch((err) => console.log(err));
    },
    deleteSignal(messageId) {
    const data = {
        id: messageId,
      };
      console.log(data);
      this.$store
        .dispatch("deleteSignalMessage", data)
        .then(() => {
            this.$store.state.renderKey++;
        })
        .catch((err) => console.log(err));
    },
  },

  created() {
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
h2 {
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 10px;
}
//.image {
  //width: 100%;
//}
</style>

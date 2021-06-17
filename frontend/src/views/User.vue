<template>
  <b-container fluid class="p-0">
    <b-row class="d-flex flex-column align-items-center p-0 m-0">
      <b-col cols="11" lg="4" class="p-0">
        <GoBack class="goback"/>
        <div class="loading" v-if="loading">Chargement...</div>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <div v-if="user" class="conteneur text-white">
          <b-avatar variant="primary" :src="user.avatar" size="10rem" class="avatar--conteneur mb-3"></b-avatar>
          <div class="conteneur--top">
            <h2 class="conteneur--top__titre text-center">{{ user.firstname }} {{ user.lastname }}</h2>
          </div>
          <div  class="conteneur--bottom mt-3 p-3">
          <p>Date de naissance : <span v-if="user.birthdate">{{ user.birthdate }}</span> <span v-else>Pas encore renseignée</span> </p>
          <p>Bio : <span v-if="user.bio">{{ user.bio }}</span> <span v-else>Pas encore renseignée</span> </p>  
          <p>{{ user.firstname }} est incrit depuis le {{ formatDate }} et a posté un total de {{ numberOfMessages }}.</p>
          </div>
        </div>
        <div class="text-center mt-3">
          <b-button variant="secondary" :href="`mailto:${user.email}`">Envoyer un email à {{ user.firstname }}</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GoBack from "../components/GoBack.vue";
const moment = require('moment');
moment().format(); 
moment.locale('fr');

export default {
  name: "User",
  components: {
    GoBack,
  },
  data() {
    return {
      loading: false,
      error: null,
      user: null,
    };
  },
  created() {
    // récupérer les données lorsque la vue est créée et
    // que les données sont déjà observées
    this.fetchData();
  },
  watch: {
    // appeler encore la méthode si la route change
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const data = this.$route.params.id;
      this.$store
        .dispatch("getUserProfil", data)
        .then(() => {
          this.loading = false;
          this.user = this.$store.state.otherUserProfile;
        })
        .catch((err) => {
          this.error = err;
          console.log(err);
        });
    },
  },
  computed: {
    numberOfMessages() {
      if (this.user.Messages.length >= 2) {
        return this.user.Messages.length + " messages";
      } else {
        return this.user.Messages.length + " message";
      }
    },
    formatDate() {
      // use moment.js
      const dateOfCreation = moment(this.user.createdAt);
      return dateOfCreation.format("dddd Do MMMM YYYY à k:mm");
    },
  }
};
</script>

<style lang="scss">
.goback {
  position: absolute;
  top: 0.5rem;
  left: -0.5rem;
}
.conteneur {
  margin-top: 6rem;
  position: relative;
}
.avatar--conteneur {
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid #CD424B;
}
.conteneur--top {
  height: 8rem;
  background-color: #122441;
  border: 3px solid #CD424B;
  border-radius: 50% 50% 2rem 2rem;
  &__titre {
    padding-top : 5rem;
  }
}
.conteneur--bottom {
  border: 3px solid #CD424B;
  border-radius: 1rem;
}
</style>
<template>
  <b-container fluid class="p-0">
    <b-row class="d-flex flex-column align-items-center p-0 m-0">
      <b-col cols="11" lg="4" class="p-0">
        <GoBack class="goback"/>
        <div class="loading" v-if="loading">Chargement...</div>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <div v-if="user" class="conteneur">
          <b-avatar variant="primary" :src="user.avatar" size="10rem" class="avatar--conteneur mb-3"></b-avatar>
          <div class="conteneur--top px-3">
            <h1 class="conteneur--top__titre text-center">{{ user.firstname }} {{ user.lastname }}</h1>
            <div  class="conteneur--bottom mt-3 p-3">
              <p>Date de naissance : <span v-if="user.birthdate">{{ user.birthdate }}</span> <span v-else>Pas encore renseignée</span> </p>
              <div class="separateur mx-auto my-3"></div>
              <p>Bio : <span v-if="user.bio">{{ user.bio }}</span> <span v-else>Pas encore renseignée</span> </p>  
              <div class="separateur mx-auto my-3"></div>
              <p>{{ user.firstname }} est incrit(e) depuis le {{ formatDate }} et a posté un total de {{ numberOfMessages }}.</p>
            </div>
            <div class="text-center mt-3 mb-4">
              <b-button variant="secondary" :href="`mailto:${user.email}`">Envoyer un email à {{ user.firstname }}</b-button>
            </div>
          </div>
          
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
      user: '',
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
  z-index: 1;
  box-shadow: 3px -5px 5px rgba($color: #000000, $alpha: 0.5);
}
.conteneur--top {
  min-height: 8rem;
  background: linear-gradient(
      to right bottom,
      rgba($color: #ffffff, $alpha: 0.5),
      rgba($color: #ffffff, $alpha: 0.6),
      rgba($color: #ffffff, $alpha: 0.3),
      rgba($color: #ffffff, $alpha: 0.7)); 
  backdrop-filter: blur(5px);
  z-index: -100;
  border: 2px solid rgba($color: #ffffff, $alpha: 0.2);
  box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.5),
              inset 5px 10px 10px rgba($color: #ffffff, $alpha: 0.5),
              inset -5px -10px 10px rgba($color: #000000, $alpha: 0.4);
  border-radius: 2rem;
  &__titre {
    padding-top : 6rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #122441;
  }
}
.conteneur--bottom {
  background-color: rgba($color: #ffffff, $alpha: 0.3);
  border-radius: 2rem;
  box-shadow: inset 3px 15px 10px rgba($color: #ffffff, $alpha: 0.5),
                inset -3px -5px 10px rgba($color: #000000, $alpha: 0.2);
}
.separateur {
  height: 5px;
  width: 100px;
  background-color: #CD424B;
  box-shadow: 3px -2px 5px rgba($color: #000000, $alpha: 0.5);
}
</style>
<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col cols=12 lg="4">
        
      <b-form @submit="signupSubmit">
        <label class="mt-3 text-white" for="input-firstname">Prénom :</label>
        <b-form-input
          type="text"
          id="input-firstname"
          autocomplete="firstname"
          v-model="signupForm.firstname"
          placeholder="prénom"
          required
        ></b-form-input>

        <label class="mt-3 text-white" for="input-lastname">Nom :</label>
        <b-form-input
          type="text"
          id="input-lastname"
          autocomplete="lastname"
          v-model="signupForm.lastname"
          placeholder="nom"
          required
        ></b-form-input>

        <label class="mt-3 text-white" for="input-email">E-mail :</label>
        <b-form-input
          id="input-email"
          v-model="signupForm.email"
          type="email"
          autocomplete="email"
          placeholder="martin.durand@groupomania.fr"
          required
        ></b-form-input>

        <label class="mt-3 text-white" for="input-password">Password :</label>
        <b-form-input
          id="input-password"
          type="password"
          autocomplete="new-password"
          v-model="signupForm.password"
          placeholder="password"
          required
        ></b-form-input>
        <small id="passwordHelp" class="form-text text-white">6 caractères dont au moins 1 Majuscule et un caractères spécial</small>

        <b-button block class="mt-3 mx-auto" type="submit" variant="secondary"
          >Créer mon compte</b-button
        >
        <p v-if="showError" id="error" class="text-white text-center mt-3">{{ error }}</p>
      </b-form>

      <p class="text-white text-center mt-3">Déjà un compte ? <router-link :to="{ name: 'Login'}"><span class="font-weight-bold text-white">Veuillez vous connecter</span></router-link></p>
    </b-col>
    </b-row>
  </b-container>
</template>

<script>


export default {
    name: 'Signup',
    components: {
      
    },
  data() {
    return {
      signupForm: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      },
      showError: false,
      error: ''
    };
  },
  methods: {
    signupSubmit(event) {
      event.preventDefault()
      // Vérification REGEX pour Email et Password
      const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
      if (!EMAIL_REGEX.test(this.signupForm.email)) {
        this.showError = true,
        this.error = "Format de l'email incorrect";
        return
      }
      if (!PASSWORD_REGEX.test(this.signupForm.password)) {
        this.showError = true,
        this.error = "Format du mot de passe incorrect";
        return
      }
      this.$store.dispatch("signup", this.signupForm)
      .then(() => {
        this.$store.dispatch("login", this.signupForm)
        .then(() => this.$router.replace('/Home'))
        .catch((err) => {console.log(err)})
        
      })
      .catch(err => {
        this.showError = true;
        this.error = `Une erreur s'est produite : ${err}`;
        console.log(err)
      })
    },
  }
};
</script>

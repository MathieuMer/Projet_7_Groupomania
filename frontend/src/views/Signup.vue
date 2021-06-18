<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col cols=12 lg="4">
        <AnimationLogo />
      <b-form @submit="signupSubmit">
        <label class="mt-3 text-white" for="input-firstname">Prénom :</label>
        <b-form-input
          type="text"
          id="input-firstname"
          v-model="signupForm.firstname"
          placeholder="prénom"
        ></b-form-input>

        <label class="mt-3 text-white" for="input-lastname">Nom :</label>
        <b-form-input
          type="text"
          id="input-lastname"
          v-model="signupForm.lastname"
          placeholder="nom"
        ></b-form-input>

        <label class="mt-3 text-white" for="input-email">E-mail :</label>
        <b-form-input
          id="input-email"
          v-model="signupForm.email"
          type="email"
          placeholder="martin.durand@groupomania.fr"
          required
        ></b-form-input>

        <label class="mt-3 text-white" for="input-password">Password :</label>
        <b-form-input
          id="input-password"
          type="password"
          v-model="signupForm.password"
          placeholder="password"
        ></b-form-input>

        <b-button block class="mt-3 mx-auto" type="submit" variant="secondary"
          >Créer mon compte</b-button
        >
      </b-form>

      <p class="text-white text-center mt-3">Déjà un compte ? <router-link :to="{ name: 'Login'}"><span class="font-weight-bold text-white">Veuillez vous connecter</span></router-link></p>
    </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AnimationLogo from '@/components/AnimationLogo.vue'

export default {
    name: 'Signup',
    components: {
      AnimationLogo
    },
  data() {
    return {
      signupForm: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      },
    };
  },
  methods: {
    signupSubmit(event) {
      event.preventDefault()
      console.log(this.form);
      this.$store.dispatch("signup", this.signupForm)
      .then(() => {
        this.$store.dispatch("login", this.signupForm)
        .then(() => this.$router.replace('/Home'))
        .catch((err) => console.log(err))
        
      })
      .catch(err => console.log(err))
    },
  }
};
</script>

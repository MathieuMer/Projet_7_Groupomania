<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col cols="12" col lg="4">
        <AnimationLogo />
       
        <b-form @submit="loginSubmit">
         
          <label class="mt-3 text-white" for="input-email">E-mail :</label>
          <b-form-input
            id="input-email"
            autocomplete="current-email"
            v-model="form.email"
            type="email"
            placeholder="martin.durand@groupomania.fr"
            required
          ></b-form-input>

          <label class="mt-3 text-white" for="input-password">Password :</label>
          <b-form-input
            type="password"
            id="input-password"
            v-model="form.password"
            autocomplete="current-password"
            placeholder="password"
            required
          ></b-form-input>

          <b-button block class="mt-3 mx-auto" type="submit" variant="secondary"
            >Se connecter</b-button
          >
          <p v-if="showError" id="error" class="text-white text-center mt-3">Erreur lors de l'identification : Email et/ou mot de passe incorrect</p>

          <p class="text-white text-center mt-3">Pas encore de compte ? <router-link :to="{ name: 'Signup'}"><span class="font-weight-bold text-white">Créer un compte</span></router-link></p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AnimationLogo from '@/components/AnimationLogo.vue'

export default {
  name: 'Login',
  components: {
    AnimationLogo,
	},
   data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false
    };
  },

  methods: {
    loginSubmit(event) {
      event.preventDefault()
      console.log(this.form);
      this.$store.dispatch("login", this.form)
      .then(() => this.$router.push('/Home'))
      .catch(err => {
        this.showError = true;
        console.log(err);
      })
    }
  }
};
</script>

<style lang="scss" scoped>


</style>

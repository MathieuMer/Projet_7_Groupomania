<template>
  <b-container fluid>
    <HeaderSimple />
    <b-row align-h="center">
      <b-col cols="12">
        <b-form @submit="loginSubmit">
         
          <label class="mt-3" for="input-email">E-mail :</label>
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            placeholder="martin.durand@groupomania.fr"
            required
          ></b-form-input>

          <label class="mt-3" for="input-password">Password :</label>
          <b-form-input
            id="input-password"
            v-model="form.password"
            placeholder="password"
          ></b-form-input>

          <b-button block class="mt-3 mx-auto" type="submit" variant="primary" @click="loginSubmit()"
            >Se connecter</b-button
          >
          <p v-if="showError" id="error">Username or Password is incorrect</p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HeaderSimple from '../components/HeaderSimple.vue'

export default {
  name: 'Login',
  components: {
		HeaderSimple
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
    async loginSubmit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      console.log(User);
      this.$store.dispatch("login", User);
    },
  }
};
</script>

<style lang="scss" scoped>

</style>

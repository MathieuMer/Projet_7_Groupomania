<template>
  <b-container fluid>
    <b-col>
      <b-form @submit="signupSubmit">
        <label class="mt-3" for="input-firstname">Prénom :</label>
        <b-form-input
          id="input-firstname"
          v-model="signupForm.firstname"
          placeholder="prénom"
        ></b-form-input>

        <label class="mt-3" for="input-lastname">Nom :</label>
        <b-form-input
          id="input-lastname"
          v-model="signupForm.lastname"
          placeholder="nom"
        ></b-form-input>

        <label class="mt-3" for="input-email">E-mail :</label>
        <b-form-input
          id="input-email"
          v-model="signupForm.email"
          type="email"
          placeholder="martin.durand@groupomania.fr"
          required
        ></b-form-input>

        <label class="mt-3" for="input-password">Password :</label>
        <b-form-input
          id="input-password"
          v-model="signupForm.password"
          placeholder="password"
        ></b-form-input>

        <b-button block class="mt-3 mx-auto" type="submit" variant="primary"
          >GO !</b-button
        >
      </b-form>
    </b-col>
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

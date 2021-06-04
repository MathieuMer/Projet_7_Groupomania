<template>
  <b-container fluid>
    <HeaderSimple />
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
import HeaderSimple from '../components/HeaderSimple.vue'

export default {
    name: 'Signup',
    components: {
        HeaderSimple
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
      event.preventDefault();
      alert(JSON.stringify(this.signupForm));
    },
  },
};
</script>

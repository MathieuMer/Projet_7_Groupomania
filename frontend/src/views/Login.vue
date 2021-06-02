<template>
  <b-container fluid>
    <b-row class="px-5">
        <b-col>
            <header>
                <img src="../assets/images/icon-left-font-monochrome-black.png" alt="Logo Groupomania">
            </header>
        </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="10">
        <b-form @submit="loginSubmit">
          <label for="input-email">E-mail :</label>

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

          <b-button block class="mt-3 mx-auto" type="submit" variant="primary">Se connecter</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style lang="scss" scoped>
header img {
    width: 100%;
}
</style>

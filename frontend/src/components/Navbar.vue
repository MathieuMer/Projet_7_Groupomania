<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#"><img
            src="../assets/images/icon-left-font-monochrome-black.png"
            alt="Logo Groupomania"
            height="40px"
        /></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form v-if="this.$store.state.userLogged === true">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>

            <b-nav-item to="Me" v-if="this.$store.state.token.length > 5">Mon profil</b-nav-item>
            <b-nav-item to="/" v-if="this.$store.state.token.length < 5">Login</b-nav-item>
            <b-nav-item to="/signup" v-if="this.$store.state.token.length < 5">Créer un compte</b-nav-item>
            <b-nav-item href="#" v-if="this.$store.state.token.length > 5" @click="logout()">Logout</b-nav-item>
            
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",

  methods: {
    logout() {
      this.$store.dispatch("logout")
      .then(() => this.$router.replace('/'))
      .catch(err => console.log(err))
    }
  }
};


</script>

<style scoped lang="scss">

</style>
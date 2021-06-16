<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#"><img
            src="../../public/images/icon-left-font-monochrome-white2.png"
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

            <b-nav-item to="Home" :class="{active: $route.name==='Home'}" v-if="this.$store.state.token.length > 5">Home</b-nav-item>
            <b-nav-item to="Me" :class="{active: $route.name==='Me'}" v-if="this.$store.state.token.length > 5">Mon profil</b-nav-item>
            <b-nav-item to="Admin" :class="{active: $route.name==='Admin'}" v-if="(this.$store.state.token.length > 5) && (this.$store.state.isAdmin === true) ">Admin</b-nav-item>
            <b-nav-item to="/" :class="{active: $route.name==='Login'}" v-if="this.$store.state.token.length < 5">Login</b-nav-item>
            <b-nav-item to="/signup" :class="{active: $route.name==='Signup'}" v-if="this.$store.state.token.length < 5">Créer un compte</b-nav-item>
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
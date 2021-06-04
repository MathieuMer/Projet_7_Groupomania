<template>
  <header>
        <img
            src="../assets/images/icon-left-font-monochrome-black.png"
            alt="Logo Groupomania"
            width="90%"
        />
        <b-nav>
            <b-nav-item><router-link to="/">Login</router-link></b-nav-item>
            <b-nav-item><router-link to="/signup">Créer un compte</router-link></b-nav-item>
        </b-nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderSimple'
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}


</style>
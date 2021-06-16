<template>
  <div>
    <div class="loading" v-if="loading">Chargement...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
name: "User",
  data () {
    return {
      loading: false,
      error: null
    }
  },
  created () {
    // récupérer les données lorsque la vue est créée et
    // que les données sont déjà observées
    this.fetchData()
  },
  watch: {
    // appeler encore la méthode si la route change
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // remplacer `getPost` par une fonction de récupération de données
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
</script>

<style>
</style>
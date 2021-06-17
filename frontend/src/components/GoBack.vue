<template>
  <span class="go-back">
    <b-button size="sm" @click="goBack" variant="secondary"><b-icon icon="arrow-left" variant="primary"></b-icon></b-button>
  </span>
</template>

<script>
export default {
    methods: {
        goBack() {
            return this.$router.go(-1)
        }
    }

}
</script>

<style lang="scss" scoped>
.go-back {
    cursor: pointer;
}

</style>


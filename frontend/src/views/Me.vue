<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col lg="6">
        <b-form @submit="updateProfil">
            <b-avatar :src="userAvatar" size="10rem"></b-avatar>

          <div>
            <b-button v-b-toggle.collapse-avatar variant="primary"
              >Modifier la photo de profil</b-button
            >
            <b-collapse id="collapse-avatar" class="mt-2">
              <b-card>
                <div class="d-flex mb-3">
                    <b-form-file v-model="image" placeholder="Choose an image" class="w-auto flex-grow-1"></b-form-file>
                    <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage">Clear image</b-button>
                </div>

                <b-img v-if="hasImage" :src="imageSrc" class="mb-3" fluid block rounded></b-img>
              </b-card>
            </b-collapse>
          </div>

          <p>
            {{ userFirstname }} {{ userLastname }} Age: Ajouter un getter qui
            calcule l'age
          </p>

          <div>
            <b-button v-b-toggle.collapse-newBirthdate variant="primary"
              >Modifier la date de naissance</b-button
            >
            <b-collapse id="collapse-newBirthdate" class="mt-2">
              <b-card>
                <b-form-input
                  v-model="newBirthdate"
                  type="date"
                ></b-form-input>
              </b-card>
            </b-collapse>
          </div>

          <p>{{ userBio }}</p>

          <div>
            <b-button v-b-toggle.collapse-newBio variant="primary"
              >Modifier la bio</b-button
            >
            <b-collapse id="collapse-newBio" class="mt-2">
              <b-card>
                <b-form-textarea
                  id="textarea"
                  v-model="newBio"
                  placeholder="Votre nouvelle Bio"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-card>
            </b-collapse>
          </div>
          <b-button block class="mt-3 mx-auto" type="submit" variant="primary"
          >Sauvegarder les changements</b-button>
        
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

// Encode preview image
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default {
  name: "Me",
  components: {},
  data() {
    return {
        image: null,
        newBirthdate: null,
        newBio: null,
        imageSrc: null
    };
  },
  computed: {
    ...mapState([
      "userFirstname",
      "userLastname",
      "userAvatar",
      "userBirthdate",
      "userBio"
    ]),
    hasImage() {
      return !!this.image;
    }
  },
  watch: {
    image(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.imageSrc = value;
            })
            .catch(() => {
              this.imageSrc = null;
            });
        } else {
          this.imageSrc = null;
        }
      }
    }
  },

  mounted() {
    this.$store.dispatch("getUserInfos");
  },

  methods: {
    clearImage() {
      this.image = null;
    },
    updateProfil(event) {
      event.preventDefault()
      const data = {
          image: this.image,
          bio: this.newBio,
          birthdate: this.newBirthdate
      }
      this.$store.dispatch("updateProfil", data)
      .then(() => {
        this.$router.go()
      })
      .catch(err => console.log(err))
    },
  }
};
</script>
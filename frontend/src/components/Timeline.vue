<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col lg="6">
          <!-- Phrase de bienvenue lorsque l'utilisateur se connecte (Nom et Prénom dans le store) -->
          <p v-if="this.$store.state.userFirstname !== ''">Bienvenue {{ $store.state.userFirstname }} {{ $store.state.userLastname }}</p>

          <!-- Module pour rédiger un nouveau message -->
          <div>
            <!-- bouton pour ouvrir le collapse de rédaction du nouveau message -->
            <b-button v-b-toggle.collapse-1 variant="primary">Nouvelle publication</b-button>

            <!-- Collapse contenant un Form : 1 champs texte et 1 champs pour charger une image -->
            <b-collapse id="collapse-1" class="mt-2">
              <b-form @submit="postNewMessage">
                <!-- Champs texte -->
                <b-form-textarea
                  id="textarea"
                  v-model="newMessageContent"
                  placeholder="Texte de la publication"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <!-- Champs charger une image avec preview -->
                <b-card>
                  <div class="d-flex mb-3">
                      <b-form-file v-model="image" placeholder="Importer une image" class="w-auto flex-grow-1"></b-form-file>
                      <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage">Clear image</b-button>
                  </div>
                  <b-img v-if="hasImage" :src="imageSrc" class="mb-3" fluid block rounded></b-img>
                </b-card>

                <b-button block class="mt-3 mx-auto" type="submit" variant="primary">Publier</b-button>
              </b-form>
            </b-collapse>
          </div>

        <!-- Boucle for sur le composant contenant une publication -->
        <MessageCard
        v-for="message in messages"
        :key="message.index"
        :message="message"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MessageCard from "../components/MessageCard.vue";

// Encodage pour preview de la nouvelle publication
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export default {
  name: "Timeline",
  components: {
    MessageCard,
  },
  data() {
    return {
        image: null,
        imageSrc: null,
        newMessageContent: ''
    };
  },

  computed: {
    messages() {
      return this.$store.state.messages;
    },
    hasImage() {
      return !!this.image;
    }
  },
  // Preview de l'image chargée
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

  methods: {
    clearImage() {
      this.image = null;
    },
    postNewMessage(event) {
      event.preventDefault()
      const data = {
          image: this.image,
          content: this.newMessageContent
      }
      this.$store.dispatch("postNewMessage", data)
      .then(() => {
        this.$router.go()
      })
      .catch(err => console.log(err))
    },
    
  },

  mounted() {
    // Passe l'userId de vueX, pour le remettre à jour au cas ou l'user revient sur le site et qu'il a toujours son token (session persistante)
    const userIdinVueX = this.$store.state.userId;
    this.$store.dispatch("getMessages", userIdinVueX);
  }
};
</script>

<style>
</style>
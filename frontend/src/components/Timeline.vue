<template>
  <b-container fluid class="p-0">
    <div v-if="this.$store.state.userFirstname !== ''" class="Timeline__welcome">
        <!-- Phrase de bienvenue lorsque l'utilisateur se connecte (Nom et Prénom dans le store) -->
        <p class="text-center m-0 p-0">Bienvenue {{ $store.state.userFirstname }} {{ $store.state.userLastname }}</p>
    </div>

    <b-row class="d-flex flex-column align-items-center p-0 m-0">
      
      <b-col cols="11" md="6" lg="4" class="p-0 m-0">
        <h1 class="text-white text-center py-3 m-0">Timeline</h1>
          <!-- Module pour rédiger un nouveau message -->
          <div>
            <!-- bouton pour ouvrir le collapse de rédaction du nouveau message -->
            <b-button v-b-toggle.collapse-1 variant="secondary" class="w-100">Nouvelle publication</b-button>

            <!-- Collapse contenant un Form : 1 champs texte et 1 champs pour charger une image -->
            <b-collapse id="collapse-1" class="mt-2">
              <b-form @submit="postNewMessage" class="Timeline__NewMessage">
                <!-- Champs texte -->
                <b-form-textarea
                  id="textarea"
                  v-model="newMessageContent"
                  placeholder="Texte de la publication"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <!-- Champs charger une image avec preview -->
                <div class="mt-3">
                  <div class="d-flex mb-3">
                      <b-form-file v-model="image" placeholder="Importer une image" class="w-auto flex-grow-1"></b-form-file>
                      <b-button v-if="hasImage" variant="secondary" class="ml-3" @click="clearImage">Supprimer l'image</b-button>
                  </div>
                  <b-img v-if="hasImage" :src="imageSrc" class="mb-3" fluid block rounded></b-img>
                </div>

                <b-button block class="mt-3 mx-auto" type="submit" variant="secondary">Publier</b-button>
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
        newMessageContent: '',
        renderKey: this.$store.state.renderKey
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
    },
    // renderKey(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     this.reload();
    //   }
    // }
  },

  methods: {
    clearImage() {
      this.image = null;
    },
    init() {
      this.$store.dispatch("getMessages");
    },
    
    postNewMessage(event) {
      event.preventDefault()
      const data = {
          image: this.image,
          content: this.newMessageContent
      }
      this.$store.dispatch("postNewMessage", data)
      .then(() => {
        this.imageSrc = null;
        this.image = null;
        this.$store.state.renderKey++;
      })
      .catch(err => console.log(err))
    },
    // reload() {
    //   this.$forceUpdate();
    // }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>

.Timeline__welcome {
  background-color: #CD424B;
  color: #FFFFFF;
}

.Timeline__NewMessage {
  border: 2px solid #CD424B;
  padding: 1rem;
}

h1 {
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 20px;
}

</style>

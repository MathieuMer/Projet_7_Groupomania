<template>
  <b-container fluid class="p-0">
    <b-row class="d-flex flex-column align-items-center m-0 p-0">
      <b-col cols="11" lg="4">
        <GoBack class="goback"/>

        <div class="conteneur">
          <b-avatar variant="primary" :src="userAvatar" size="10rem" class="avatar--conteneur mb-3"></b-avatar>
          <div class="conteneur--top px-3 pb-4">
            <h1 class="conteneur--top__titre text-center">{{ userFirstname }} {{ userLastname }}</h1>
            <div class="separateur mx-auto my-3"></div>
            <div  class="conteneur--bottom mt-3 p-3">
              <p>Date de naissance : <span v-if="userBirthdate">{{ userBirthdate }}</span> <span v-else>Pas encore renseignée</span> </p>
              <p>Votre description : <span v-if="userBio">{{ userBio }}</span> <span v-else>Pas encore renseignée</span> </p>  
          </div>
          </div>
        </div>
     
        <b-form @submit="updateProfil" class="d-flex flex-column align-items-center">
          
          <div class="Me__ModifyProfil mt-3 mx-2 px-4 pt-3 pb-4 w-100">
            <h2 class="text-center"><b-icon icon="gear" variant="dark"></b-icon> MODIFIER LE PROFIL</h2>
            <p class="text">Pour modifier les informations de votre profil, remplissez les champs ci dessous et sauvegardez les changements.</p>
            <div>
              <b-button block v-b-toggle.collapse-avatar variant="primary"
                >Modifier la photo de profil</b-button
              >
              <b-collapse id="collapse-avatar" class="mt-2">
                <div>
                  <div class="d-flex">
                      <b-form-file v-model="image" placeholder="Importer une image" accept=".jpeg, .jpg, .png, .gif" class="w-auto flex-grow-1"></b-form-file>
                      <b-button v-if="hasImage" variant="secondary" class="ml-3" @click="clearImage">Supprimer la photo</b-button>
                  </div>

                  <b-img v-if="hasImage" :src="imageSrc" class="mt-3" fluid block rounded></b-img>
                </div>
              </b-collapse>
            </div>

            <div class="separateur mx-auto my-3"></div>

            <div class="mt-3">
              <b-button block v-b-toggle.collapse-newBirthdate variant="primary"
                >Modifier la date de naissance</b-button
              >
              <b-collapse id="collapse-newBirthdate" class="mt-2">
                <div>
                  <label for="newBirthdate">Votre date de naissance :</label>
                  <b-form-input
                    id="newBirthdate"
                    v-model="newBirthdate"
                    type="date"
                  ></b-form-input>
                </div>
              </b-collapse>
            </div>

            <div class="separateur mx-auto my-3"></div>

            <div class="mt-3">
              <b-button block v-b-toggle.collapse-newBio variant="primary"
                >Modifier votre bio</b-button
              >
              <b-collapse id="collapse-newBio" class="mt-2">
                <div>
                  <label for="newBio">Votre nouvelle description :</label>
                  <b-form-textarea
                    id="newBio"
                    v-model="newBio"
                    placeholder="Présentez vous en quelques mots !"
                    rows="2"
                  ></b-form-textarea>
                </div>
              </b-collapse>
            </div>

            <div class="separateur mx-auto my-3"></div>

            <b-button block class="mt-3 mx-auto" type="submit" variant="secondary">Sauvegarder les changements</b-button>
          </div>        
        </b-form>

        <b-form class="d-flex flex-column align-items-center mb-3">
          <div class="Me__ModifyProfil mt-3 mx-3 p-4 w-100">
            <h2 class="text-center"><b-icon icon="exclamation-triangle" variant="danger"></b-icon> SUPPRIMER LE PROFIL</h2>
            <p class="text">Attention, la supression du compte est définitive, cela effacera tout les messages et commentaires postés sur le site.</p>
            <div class="mt-3">
              <b-button block v-b-toggle.collapse-supAccount variant="primary">Supprimer le compte</b-button>
              <b-collapse id="collapse-supAccount" class="mt-2">
                <div>
                  <label for="password" class="text">Entrez le mot de passe et valider la suppression</label>
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></b-form-input>
                  <p v-if="accountDeleteError === true" class="mt-2"><b-icon icon="exclamation-triangle" variant="danger"></b-icon> Impossible de procéder à la suppression du compte, entrez ou verifiez votre mot de passe pour confirmer la suppression.</p>
                  <b-button block @click="deleteUser()" class="mt-3 mx-auto" type="button" variant="secondary">Confirmer la suppression de votre compte</b-button>
                </div>
              </b-collapse>
            </div>
          </div>
        </b-form>


      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import GoBack from "../components/GoBack.vue";

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
  components: {
    GoBack
  },
  data() {
    return {
        image: null,
        newBirthdate: null,
        newBio: null,
        imageSrc: null,
        password: null,
        accountDeleteError: false,
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
        this.$router.replace("/Home")
      })
      .catch(err => console.log(err))
    },
    deleteUser(){
      if(!this.password) {
        this.accountDeleteError = true
        return
      }
      this.$bvModal.msgBoxConfirm('Cette action est irréversible, vous êtes sur le point de supprimer définitivement votre compte, ainsi que tous les messages et commentaires postés. Voulez vous vraiment continuer ?', {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'secondary',
        cancelVariant: 'primary',
        okTitle: 'Oui, je veux supprimer mon compte',
        cancelTitle: 'Annuler',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true
      })
      .then((confirm) => {
        if(confirm) {
          const data = {
            password: this.password
          }
          this.$store.dispatch("deleteUser", data)
          .then(() => {
            this.$router.replace("/")
          })
          .catch((err) => {
            this.accountDeleteError = true
            console.log(err)
          })
        } else {
          return
        }
      })
      .catch(err => console.log(err))
    }
  }
};
</script>

<style lang="scss" scoped>
.Me__UserCard {
  border: 2px solid rgba($color: #ffffff, $alpha: 0.3);
  background: linear-gradient(
      to right bottom,
      rgba($color: #ffffff, $alpha: 0.9),
      rgba($color: #ffffff, $alpha: 0.4),
      rgba($color: #ffffff, $alpha: 0.7),
      rgba($color: #ffffff, $alpha: 0.4),
      rgba($color: #ffffff, $alpha: 0.7),
      rgba($color: #ffffff, $alpha: 0.5),
      rgba($color: #ffffff, $alpha: 0.8)); 
  backdrop-filter: blur(5px);
  border-radius: 6rem 3rem 3rem 6rem;
}

.Me__ModifyProfil {
  border-radius: 2rem;
  background: linear-gradient(
      to right bottom,
      rgba($color: #ffffff, $alpha: 0.5),
      rgba($color: #ffffff, $alpha: 0.6),
      rgba($color: #ffffff, $alpha: 0.3),
      rgba($color: #ffffff, $alpha: 0.7)); 
  backdrop-filter: blur(5px);
  border: 2px solid rgba($color: #ffffff, $alpha: 0.2);
  box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.5),
              inset 5px 10px 10px rgba($color: #ffffff, $alpha: 0.5),
              inset -5px -10px 10px rgba($color: #000000, $alpha: 0.4);
}

h2 {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
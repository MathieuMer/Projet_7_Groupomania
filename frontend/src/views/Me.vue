<template>
  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-col lg="6">

        <p class="text" v-if="accountDeleted">Votre compte a été supprimé</p>
        

          <div class="Me__UserCard d-flex justify-content-center p-3 mt-3">
            <b-avatar variant="primary" :src="userAvatar" size="10rem"></b-avatar>
            <div class="p-3">
              <p class="text-center"> {{ userFirstname }} {{ userLastname }} </p>
              <p>Date de naissance : <span v-if="userBirthdate">{{ userBirthdate }}</span> <span v-else>Pas encore renseignée</span> </p>
              <p>Votre description : <span v-if="userBio">{{ userBio }}</span> <span v-else>Pas encore renseignée</span> </p>
            </div>
          </div>
     
        <b-form @submit="updateProfil" class="d-flex flex-column align-items-center">
          <div class="Me__ModifyProfil mt-3 mx-2 p-3 w-100">
            <p class="text">Pour modifier les informations de votre profil, remplissez les champs ci dessous et sauvegardez les changements.</p>
            <div>
              <b-button block v-b-toggle.collapse-avatar variant="primary"
                >Modifier la photo de profil</b-button
              >
              <b-collapse id="collapse-avatar" class="mt-2">
                <div>
                  <div class="d-flex">
                      <b-form-file v-model="image" placeholder="Importer une image" class="w-auto flex-grow-1"></b-form-file>
                      <b-button v-if="hasImage" variant="secondary" class="ml-3" @click="clearImage">Supprimer la photo</b-button>
                  </div>

                  <b-img v-if="hasImage" :src="imageSrc" class="mt-3" fluid block rounded></b-img>
                </div>
              </b-collapse>
            </div>

            <div class="mt-3">
              <b-button block v-b-toggle.collapse-newBirthdate variant="primary"
                >Modifier la date de naissance</b-button
              >
              <b-collapse id="collapse-newBirthdate" class="mt-2">
                <div>
                  <b-form-input
                    v-model="newBirthdate"
                    type="date"
                  ></b-form-input>
                </div>
              </b-collapse>
            </div>

            <div class="mt-3">
              <b-button block v-b-toggle.collapse-newBio variant="primary"
                >Modifier votre bio</b-button
              >
              <b-collapse id="collapse-newBio" class="mt-2">
                <div>
                  <b-form-textarea
                    id="textarea"
                    v-model="newBio"
                    placeholder="Présentez vous en quelques mots ! (Cette description sera visible lorqu'un autre utilisateur cliquera sur votre nom)"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </div>
              </b-collapse>
            </div>

            <b-button block class="mt-3 mx-auto" type="submit" variant="secondary">Sauvegarder les changements</b-button>
          </div>        
        </b-form>

        <b-form @submit="deleteUser" class="d-flex flex-column align-items-center mb-3">
          <div class="Me__ModifyProfil mt-3 mx-2 p-3 w-100">
            <p class="text">Attention, la supression du compte est définitive, cela effacera tout les messages et commentaires postés sur le site.</p>
            <div class="mt-3">
              <b-button block v-b-toggle.collapse-supAccount variant="primary">Supprimer le compte</b-button>
              <b-collapse id="collapse-supAccount" class="mt-2">
                <div>
                  <label :for="password" class="text">Entrez le mot de passe et valider la suppression</label>
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                  ></b-form-input>
                  <b-button block class="mt-3 mx-auto" type="submit" variant="secondary">Confirmer la suppression de votre compte</b-button>
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
        imageSrc: null,
        password: null,
        accountDeleted: false
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
    deleteUser(event){
      event.preventDefault()
      const data = {
          password: this.password
      }
      this.$store.dispatch("deleteUser", data)
      .then(() => {
        this.accountDeleted = !this.accountDeleted // Retarder la redirection pour afficher le message de confirmation de la suppression du compte
        this.$router.replace("/")
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
  border: 2px solid #D1515A;
  border-radius: 1rem;
}

.text {
  color: white;
}
</style>
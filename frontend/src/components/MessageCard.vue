<template>
    <!-- composant Card -->
    <b-card
      tag="article"
      class="MessageCard my-4"
      bg-variant="transparent"
    > 
      <div class=" row d-flex flex-column">
        <!-- Affichage Avatar, nom et prénom de l'auteur de la publication -->
        <div class="col d-flex justify-content-start align-items-start">
          <div>
            <b-avatar variant="primary" :src="message.User.avatar" size="5rem" class="mb-3"></b-avatar>
          </div>
          <div class="w-100">
            <p class="m-0 text-right MessageCard__formatDate">{{ formatDate }}</p>
            <h2 class="m-0 pl-3 MessageCard__name">
              <router-link v-if="message.User.id !== $store.state.userId" :to="{ name: 'User', params: { id: message.User.id }}">{{ message.User.firstname }} {{ message.User.lastname }}</router-link>
              <router-link v-else :to="{ name: 'Me' }">{{ message.User.firstname }} {{ message.User.lastname }}</router-link>
            </h2>
            <div class="col d-flex justify-content-end align-items-start w-100">
              <!-- Affichage icones modification et suppresion de la publication pour l'auteur du message -->
              <div>
                <b-button-toolbar aria-label="Groupe de boutons avec différentes options">
                  <b-button-group class="card__buttons mx-1">
                    <b-button v-if="(message.User.id === $store.state.userId)" variant="light" size="sm" @click="editMessageContent(message)" aria-label="editer-message"><b-icon icon="pen-fill" variant="primary"></b-icon></b-button>
                    <b-button v-if="(message.User.id === $store.state.userId) || $store.state.isAdmin" variant="light" size="sm" @click="deleteMessage(message.id)" aria-label="supprimer-message"><b-icon icon="trash-fill" variant="danger"></b-icon></b-button>
                    <b-button v-if="(message.User.id !== $store.state.userId) && !$store.state.isAdmin" variant="light" size="sm" @click="signalMessage(message.id)" aria-label="signaler-message"><b-icon icon="exclamation-triangle" variant="warning"></b-icon></b-button>
                  </b-button-group>
                </b-button-toolbar>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      
      <b-card-text v-show="!activeEdit"> {{ message.content }} </b-card-text>
      
      <!-- Zone édition du message -->
      <div v-if="activeEdit" v-click-outside="onClickOutside" ref="editMessage" class="d-flex flex-column">
        <input class="w-100 bg-transparent mb-3" type="text" v-model="message.content" @keyup.enter="doneEdit()" @keyup.esc="cancelEdit()" v-focus="message.content === activeEdit">
        <div v-if="activeEdit" class="d-flex mb-3">
          <b-form-file 
            v-model="newImage"
            placeholder="Importer une image"
            class="w-auto flex-grow-1"
            accept=".jpeg, .jpg, .png, .gif"
          ></b-form-file>
        </div>
        <div class="d-flex justify-content-end pb-3">
          <b-button v-if="activeEdit && (message.imageurl || newImageSrc)" class="mr-2" variant="light" size="sm" @click="deleteImage()">Supprimer l'image<b-icon icon="trash-fill" variant="danger"></b-icon></b-button>
          <b-button class="mr-2" variant="secondary" size="sm" @click="cancelEdit()">Annuler</b-button>
          <b-button variant="primary" size="sm" @click="doneEdit()">Valider les changements</b-button>
        </div>
      </div>

      <!-- Image de la publication -->
      <img v-if="message.imageurl && newImage == null" class="MessageCard__image" :src="message.imageurl" alt="" width="100%">
      <img v-if="newImage !== null" class="MessageCard__image" :src="newImageSrc" alt="" width="100%">

      <!-- Affichage du nombre de commentaires si il y en a -->
      <div v-if="message.Comments.length >= 1">
        <p class="py-2 m-0"><span tabindex=0 @click="showComments = !showComments" @keyup.enter="showComments = !showComments" class="showComments">{{numberOfComments}}</span></p>
      </div>

      <!-- Boucle Affichage Commentaires -->
      <b-collapse v-model="showComments" class="MessageCard__commentCollapse">
      <CommentModule
        v-for="comment in message.Comments"
        :key="comment.index"
        :comment="comment"
      />
      </b-collapse>

      <!-- New Comment -->
      <div class="px-3 pt-0">
          <b-form  @submit="submitComment" class="row d-flex justify-content-around">
            <label :for="`new-comment-${message.id}`" class="w-100 text-small text-left">Votre commentaire:</label>
            <b-form-textarea
            :id="`new-comment-${message.id}`"
            class="col-12"
            v-model="NewComment"
            placeholder="Votre commentaire ici"
            rows="2"
            no-resize
            required
            ></b-form-textarea>
            <b-button class="col-12 NewComment__button py-1 mt-2" type="submit" variant="primary">Envoyer le commentaire</b-button>

          </b-form>
      </div>


    </b-card>
</template>

<script>
import Vue from 'vue';
import CommentModule from "../components/CommentModule.vue";
import vClickOutside from 'v-click-outside';
const moment = require('moment');
moment().format(); 
moment.locale('fr');

const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default {
  name: "MessageCard",
  components: {
    CommentModule,
  },

  props: {
    message: {type: Object}
  },

  data() {
        return {
          Comments: this.message.Comments,
          showComments: false,
          NewComment: '',
          activeEdit: null,
          oldEdit: null,
          oldImage: null,
          newImage: null,
          newImageSrc: null,
          deleteOld: false
        } 
  },

  methods: {
    doneEdit() {
      if (!this.activeEdit) {
        return
      }
      let data ='';
      let messageId = this.message.id;
      let content = this.activeEdit.content;
      let file = this.newImage;
      if (!file && this.oldImage && this.deleteOld) {
        data = {
          messageId:  messageId,
          content: content,
          deleteOld: true
        }
      } else {
        data = {
          messageId: messageId,
          content: content,
          file: file
        }
      }
      this.$store.dispatch("editMessage", data)
      .then(() => {
        this.makeToast('Votre post a été updaté avec succès !');
        this.activeEdit = null;
        this.oldEdit = null;
        this.oldEdit = null;
        this.oldImage = null;
        this.newImage = null;
        this.newImageSrc = null;
        this.deleteOld = false;
        this.$store.state.renderKey++;
        this.reload();
      })
      .catch(err => console.log(err))
    },
    editMessageContent(message) {
      this.activeEdit = this.message;
      this.oldEdit = message.content;
      this.oldImage = message.imageurl;
      //this.$refs.editMessage.focus();
    },
    cancelEdit() {
      this.message.content = this.oldEdit;
      this.message.imageurl = this.oldImage;
      this.newImage = null;
      this.newImageSrc = null;
      this.activeEdit = null;
    },
    deleteImage() {
      this.message.imageurl = null;
      this.newImage = null;
      this.newImageSrc = null;
      this.deleteOld = true;
    },
    deleteMessage(messageId) {
      const data = {
        id: messageId
      };
      this.$store.dispatch("deleteMessage", data)
      .then(() => {
        const userIdinVueX = this.$store.state.userId;
        this.$store.dispatch("getMessages", userIdinVueX);
      })
      .catch(err => console.log(err))
    },
    signalMessage(messageId) {
      const data = {
        messageId: messageId
      };
      this.$store.dispatch("signalMessage", data)
      .then(() => {
        this.makeToast('Le post a bien été signalé,, il sera traité par un admin dès que possible');
      })
      .catch(err => console.log(err))
    },
    makeToast(message) {
        this.$bvToast.toast(message, {
          title: 'Groupomania Info',
          toaster: 'b-toaster-bottom-right'          
        })
    },
    submitComment(event) {
      event.preventDefault()
      const data = {
        content: this.NewComment,
        messageId: this.message.id
      };
      console.log(data);
      this.$store.dispatch("submitComment", data)
      .then(() => {
        this.NewComment = '';
        this.$store.state.renderKey++;
      })
      .catch(err => console.log(err))
    },
    reload() {
      this.$forceUpdate();
    },
    onClickOutside () {
      this.cancelEdit();
    }
    
    
  },

  computed: {
    numberOfComments() {
      if (this.message.Comments.length >= 2) {
        return this.message.Comments.length + " commentaires";
      } else {
        return this.message.Comments.length + " commentaire";
      }
    },
    formatDate() {
      // use moment.js
      const dateOfCreation = moment(this.message.createdAt);
      const now = moment();
      const diff = moment.duration(now.diff(dateOfCreation)).as('hours');
        if (diff < 72 ) {
        return dateOfCreation.from(now);
      } else {
        return dateOfCreation.format("dddd Do MMMM YYYY à k:mm");
      }
    },
    hasImage() {
      return !!this.newImage;
    }
  },
  // Preview de l'image chargée
  watch: {
    newImage(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          base64Encode(newValue)
            .then(value => {
              this.newImageSrc = value;
            })
            .catch(() => {
              this.newImageSrc = null;
            });
        } else {
          this.newImageSrc = null;
        }
      }
    },
  },

  directives: {
    focus (el, value) {
      if (value) {
        Vue.nextTick(() => {
          el.focus()
        })
      }
    },
    clickOutside: vClickOutside.directive,
  },

};
</script>

<style lang="scss" scoped>
.MessageCard {
  background: linear-gradient(
      to right bottom,
      rgba($color: #ffffff, $alpha: 0.5),
      rgba($color: #ffffff, $alpha: 0.6),
      rgba($color: #ffffff, $alpha: 0.3),
      rgba($color: #ffffff, $alpha: 0.7),
      rgba($color: #ffffff, $alpha: 0.7),
      rgba($color: #ffffff, $alpha: 0.5),
      rgba($color: #ffffff, $alpha: 0.8)); 
  backdrop-filter: blur(5px);
  background-attachment: scroll;
  // background-position: 50% 50%;
  border: 2px solid rgba($color: #ffffff, $alpha: 0.2);
  box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.5),
              inset 5px 10px 10px rgba($color: #ffffff, $alpha: 0.5),
              inset -5px -10px 10px rgba($color: #000000, $alpha: 0.4);
}

.MessageCard__image {
  border-radius: 0.5rem;
  border: 2px solid rgba($color: #000000, $alpha: 0.5);
}

.MessageCard__name {
  font-weight: bold;
  font-size: 1.2rem;
}
.MessageCard__name:after {
  content: '';
  position: absolute;
  top: 4rem;
  left: 7rem;
  width: 4rem;
  height: 0.3rem;
  background: #CD424B;
}

.NewComment__button {
  border-radius: 0 0 2rem 1rem;
}

.showComments{
  cursor: pointer;
}
.MessageCard__formatDate {
  font-style: italic;
  font-size: 1rem;
}



</style>
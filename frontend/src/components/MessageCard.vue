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
            <p class="m-0 text-right">{{ formatDate }}</p>
            <p class="m-0 pl-3 card__name"><router-link :to="{ name: 'User', params: { id: message.User.id }}">{{ message.User.firstname }} {{ message.User.lastname }}</router-link></p>
            <div class="col d-flex justify-content-end align-items-start w-100">
              <!-- Affichage icones modification et suppresion de la publication pour l'auteur du message -->
              <div>
                <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
                  <b-button-group class="card__buttons mx-1">
                    <b-button v-if="(message.User.id === $store.state.userId)" variant="light" size="sm" @click="editMessage(message)"><b-icon icon="pen-fill" variant="primary"></b-icon></b-button>
                    <b-button v-if="(message.User.id === $store.state.userId) || $store.state.isAdmin" variant="light" size="sm" @click="deleteMessage(message.id)"><b-icon icon="trash-fill" variant="danger"></b-icon></b-button>
                    <b-button v-if="(message.User.id !== $store.state.userId) && !$store.state.isAdmin" variant="light" size="sm" @click="signalMessage(message.id)"><b-icon icon="exclamation-triangle" variant="warning"></b-icon></b-button>
                  </b-button-group>
                </b-button-toolbar>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>

      <b-card-text> {{ message.content }} </b-card-text>

      <!-- Image de la publication -->
      <img v-if="message.imageurl" class="card__image" :src="message.imageurl" alt="" width="100%">

      <!-- Affichage du nombre de commentaires si il y en a -->
      <div v-if="message.Comments.length >= 1">
        <p @click="showComments = !showComments"> {{numberOfComments}} </p>
      </div>

      <!-- Boucle Affichage Commentaires -->
      <b-collapse id="collapse-4" v-model="showComments" class="MessageCard__commentCollapse mt-2">
      <CommentModule
        v-for="comment in message.Comments"
        :key="comment.index"
        :comment="comment"
      />
      </b-collapse>

      <!-- New Comment -->
      <div class="mt-4 px-3">
          <b-form inline @submit="submitComment" class="row d-flex justify-content-between">
            <b-form-textarea
            class="col-9"
            id="textarea-no-resize"
            v-model="NewComment"
            placeholder="Votre commentaire ici"
            rows="2"
            no-resize
            required
            ></b-form-textarea>
            <b-button class="col-2 NewComment__button" type="submit" variant="primary">Envoi<br/><b-icon icon="reply"></b-icon></b-button>
          </b-form>
      </div>


    </b-card>
</template>

<script>
import Vue from 'vue';
import CommentModule from "../components/CommentModule.vue";
const moment = require('moment');
moment().format(); 
moment.locale('fr');

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
            showComments: true,
            renderKey: this.$store.state.renderKey,
            NewComment: '',
            
        }
  },

  methods: {
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
          solid: true
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
  },

  directives: {
    focus (el, value) {
      if (value) {
        Vue.nextTick(() => {
          el.focus()
        })
      }
    }
  },

};
</script>

<style lang="scss" scoped>
.MessageCard {
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
  background-attachment: scroll;
  // background-position: 50% 50%;
  border: 2px solid rgba($color: #ffffff, $alpha: 0.3);
  box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.5);
}

.card__image {
  border-radius: 0 0 3rem 1rem;
}

.card__name:after {
  content: '';
  position: absolute;
  top: 4rem;
  left: 7rem;
  width: 4rem;
  height: 0.3rem;
  background: #D1515A;
}

.NewComment__button {
  border-radius: 1rem 0 2rem 0;
}



</style>
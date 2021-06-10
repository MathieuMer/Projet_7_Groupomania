<template>
    <!-- composant Card -->
    <b-card
      tag="article"
      class="my-2"
    > 
      <!-- Affichage date de création -->
      <p>{{ formatDate }}</p>

      <!-- Affichage icones modification et suppresion de la publication pour l'auteur du message -->
      <div v-if="message.User.id === $store.state.userId">
          <b-button variant="link" @click="editMessage(message)">
            <b-icon icon="pen-fill" variant="danger"></b-icon>
          </b-button>
          <b-button variant="link" @click="deleteMessage(message.id)">
            <b-icon icon="trash-fill" variant="danger"></b-icon>
          </b-button>
      </div>
      <!-- Champs de modification du message -->
      <input type="text" class="edit" v-model="message.content" v-if="editingMessage.id === message.id" @keyup.esc="CancelEditMessage" @keyup.enter="updateEditMessage(message)" v-focus="editingMessage.id === message.id">
      <!-- Affichage Avatar, nom et prénom de l'auteur de la publication -->
      <div class="d-flex">
        <div>
          <b-avatar :src="message.User.avatar" size="5rem"></b-avatar>
        </div>
        <div>
          <p>{{ message.User.firstname }} {{ message.User.lastname }}</p>
          <p>{{ message.User.job }}</p>
        </div>
      </div>
      <b-card-text> {{ message.content }} </b-card-text>

      <!-- Image de la publication -->
      <img :src="message.imageurl" alt="" width="100%">

      <!-- Affichage du nombre de commentaires si il y en a -->
      <div v-if="Comments.length >= 1">
        <p @click="showComments = !showComments"> {{numberOfComments}} </p>
      </div>

      <!-- Boucle Affichage Commentaires -->
      <b-list-group flush 
        v-show="showComments"
        v-for="Comment in Comments"
        :key="Comment.index"
        :Comment="Comment"
      > 
        <!-- Bloc commentaire -->
        <b-list-group-item>
          <div>
            <!-- Avatar, nom et prénom de l'auteur du commentaire -->
            <b-avatar :src="Comment.User.avatar" size="2rem"></b-avatar>
            {{Comment.User.firstname}} {{Comment.User.lastname}}

            <!-- Boutons Edit et Delete uniquement pour l'auteur du commentaire -->
            <div v-if="Comment.User.id === $store.state.userId">
              <b-button variant="link" @click="editComment(Comment)">
                <b-icon icon="pen-fill" variant="danger"></b-icon>
              </b-button>
              <b-button variant="link" @click="deleteComment(Comment.id)">
                <b-icon icon="trash-fill" variant="danger"></b-icon>
              </b-button>
            </div>
          </div>
          <!-- Texte du commentaire -->
          <div>
            {{Comment.content}}
          </div>
        </b-list-group-item>

        <!-- Champs de modification du commentaire -->
        <input type="text" class="edit" v-model="Comment.content" v-if="editingComment.id === Comment.id" @keyup.esc="CancelEditComment" @keyup.enter="updateEditComment(Comment)" v-focus="editingComment.id === Comment.id">
      </b-list-group>

      <!-- Module pour écrire un nouveau commentaire -->
      <b-form @submit="submitComment">
           <b-form-textarea
            
            size="sm"
            v-model="NewComment"
            placeholder="Votre commentaire ici"
            rows="3"
            max-rows="6"
            required
        ></b-form-textarea>
        <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>

    </b-card>
</template>

<script>
import Vue from 'vue';
// import moment library (format Date)
const moment = require('moment');
moment().format(); 
moment.locale('fr');

export default {
  name: "MessageCard",

  props: ["message"],

  data() {
        return {
            Comments: this.message.Comments,
            showComments: false,
            NewComment: '',
            editingComment: '',
            oldComment: '',
            editingMessage: '',
            oldMessage: ''
        }
  },

  methods: {
    submitComment(event) {
      event.preventDefault()
      const data = {
        content: this.NewComment,
        messageId: this.message.id
      };
      console.log(data);
      this.$store.dispatch("submitComment", data)
      .then(() => {
        this.$router.go()
      })
      .catch(err => console.log(err))
    },
    deleteComment(CommentId) {
      const data = {
        commentId: CommentId
      };
      console.log(data);
      this.$store.dispatch("deleteComment", data)
      .then(() => {
        this.$router.go()
      })
      .catch(err => console.log(err))
    },
    editComment(Comment) {
      this.editingComment = Comment;
      this.oldComment = this.editingComment.content;
    },
    editMessage(message) {
      this.editingMessage = message;
      this.oldMessage = this.editingMessage.content;
    },
    StopEditComment() {
      this.editingComment = ''
    },
    StopEditMessage() {
      this.editingMessage = ''
    },
    CancelEditComment() {
      this.editingComment.content = this.oldComment;
      this.StopEditComment();
    },
    CancelEditMessage() {
      this.editingMessage.content = this.oldMessage;
      this.StopEditMessage();
    },
    updateEditComment(Comment) {
      const data = {
        commentId: Comment.id,
        content: Comment.content
      };
      console.log(data);
      this.$store.dispatch("editComment", data)
      .then(() => {
        this.editingComment = ''
      })
      .catch(err => console.log(err))
    },
    deleteMessage(messageId) {
      const data = {
        id: messageId
      };
      console.log(data);
      this.$store.dispatch("deleteMessage", data)
      .then(() => {
        this.$router.go()
      })
      .catch(err => console.log(err))
    },
  },

  computed: {
    numberOfComments() {
      if (this.Comments.length >= 2) {
        return this.Comments.length + " commentaires";
      } else {
        return this.Comments.length + " commentaire";
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
  }

};
</script>

<style>
</style>
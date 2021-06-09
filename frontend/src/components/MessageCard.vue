<template>
    <b-card
      tag="article"
      class="my-2"
    > 
      
        <p>{{ formatDate }}</p>
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

      <img :src="message.imageurl" alt="" width="100%">

      <div v-if="Comments.length >= 1">
        <p @click="showComments = !showComments"> {{numberOfComments}} </p>
      </div>

      <b-list-group flush 
        v-show="showComments"
        v-for="Comment in Comments"
        :key="Comment.index"
        :Comment="Comment"
      >
        <b-list-group-item>
          <div>

            <b-avatar :src="Comment.User.avatar" size="2rem"></b-avatar>
            {{Comment.User.firstname}} {{Comment.User.lastname}}

            <div v-if="Comment.User.id === $store.state.userId">
              <b-button variant="link" @click="editComment">
                <b-icon icon="pen-fill" variant="danger"></b-icon>
              </b-button>
              <b-button variant="link" @click="deleteComment">
                <b-icon icon="trash-fill" variant="danger"></b-icon>
              </b-button>
            </div>
            
          </div>

          <div>
            {{Comment.content}}
          </div>

        </b-list-group-item>
      </b-list-group>

      <b-form @submit="submitComment">
           <b-form-textarea
            id="textarea-sm"
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
            NewComment: ''
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
    deleteComment(event) {
      event.preventDefault()
      const data = {
        commentId: this.message.Comments.id
      };
      console.log(data);
      this.$store.dispatch("deleteComment", data)
      .then(() => {
        //this.$router.go()
      })
      .catch(err => console.log(err))
    },
    editComment(event) {
      event.preventDefault()
      const data = {
        commentId: this.Comments.id
      };
      console.log(data);
      this.$store.dispatch("editComment", data)
      .then(() => {
        //this.$router.go()
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
  }

};
</script>

<style>
</style>
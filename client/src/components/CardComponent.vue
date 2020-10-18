<template>
  <div class="container-fluid">
    <h2>Kanban Board</h2>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>

    <!-- create card -->
    <div class="row">
      <div class="col form-inline">
        <input type="text" class="form-control" id="inputName" v-model="newName" placeholder="Enter Name" required>
        <input type="text" class="form-control" id="inputEducation" v-model="newEducation" placeholder="Enter Education" required>
        <input type="text" class="form-control" id="inputContact" v-model="newContact" placeholder="Enter Contact" required>
        <button v-on:click="createCard" class="btn btn-primary ml-3">Add Candidate</button>
      </div>
    </div>

    <p align="left">Double click cards to delete the candidate.</p>


    <!-- show board -->
    <div class="row mt-5">
      <div class="col-2">
        <div class="p-2 alert alert-primary">
          <h5>Applied</h5>
          <!-- Backlog draggable component. Pass arrApplied to list prop -->
          <draggable
            class="list-group kanban-column Applied"
            :list="arrApplied"
            group="status"
            @change="changeToApplied"
            >
            <div
              class="list-group-item"
              v-for="element in arrApplied"
              :key="element._id"
              v-on:dblclick="deleteCard(element._id)"
            >

              <div class="person">
                <h6>{{ element.name }}</h6>
                <p>{{ element.education }}, {{ element.contact }}</p>
                <a href="#">Comment</a>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-warning">
          <h5>Phone Screen</h5>
          <!-- In Progress draggable component. Pass arrPhoneScreen to list prop -->
          <draggable
            class="list-group kanban-column PhoneScreen"
            :list="arrPhoneScreen"
            group="status"
            @change="changeToPhoneScreen"
          >
            <div
              class="list-group-item"
              v-for="element in arrPhoneScreen"
              :key="element._id"
              v-on:dblclick="deleteCard(element._id)"
            >
              <div class="person">
                <h6>{{ element.name }}</h6>
                <p>{{ element.education }}, {{ element.contact }}</p>
                <a href="#">Comment</a>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-info">
          <h5>On Site</h5>
          <!-- Testing draggable component. Pass arrOnSite to list prop -->
          <draggable
            class="list-group kanban-column OnSite"
            :list="arrOnSite"
            group="status"
            @change="changeToOnSite"
          >
            <div
              class="list-group-item"
              v-for="element in arrOnSite"
              :key="element._id"
              v-on:dblclick="deleteCard(element._id)"
            >
              <div class="person">
                <h6>{{ element.name }}</h6>
                <p>{{ element.education }}, {{ element.contact }}</p>
                <a href="#">Comment</a>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-danger">
          <h5>Offered</h5>
          <!-- Done draggable component. Pass arrOffered to list prop -->
          <draggable
            class="list-group kanban-column Offered"
            :list="arrOffered"
            group="status"
            @change="changeToOffered"
          >
            <div
              class="list-group-item"
              v-for="element in arrOffered"
              :key="element._id"
              v-on:dblclick="deleteCard(element._id)"
            >
              <div class="person">
                <h6>{{ element.name }}</h6>
                <p>{{ element.education }}, {{ element.contact }}</p>
                <a href="#">Comment</a>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-success">
          <h5>Accepted</h5>
          <!-- Done draggable component. Pass arrAccepted to list prop -->
          <draggable
            class="list-group kanban-column Accepted"
            :list="arrAccepted"
            group="status"
            @change="changeToAccepted"
          >
            <div
              class="list-group-item"
              v-for="element in arrAccepted"
              :key="element._id"
              v-on:dblclick="deleteCard(element._id)"
            >
              <div class="person">
                <h6>{{ element.name }}</h6>
                <p>{{ element.education }}, {{ element.contact }}</p>
                <a href="#">Comment</a>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-secondary">
          <h5>Rejected</h5>
          <!-- Done draggable component. Pass arrRejected to list prop -->
          <draggable
            class="list-group kanban-column Rejected"
            :list="arrRejected"
            group="status"
            @change="changeToRejected"
          >
            <div
              class="list-group-item"
              v-for="element in arrRejected"
              :key="element._id"
              v-on:dblclick="deleteCard(element._id)"
            >
              <div class="person">
                <h6>{{ element.name }}</h6>
                <p>{{ element.education }}, {{ element.contact }}</p>
                <a href="#">Comment</a>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CardService from '../CardService';
import draggable from "vuedraggable";

export default {
  name: 'CardComponent',
  components: {
    //import draggable as a component
    draggable
  },
  data() {
    return {
      // for new cards
      newName: '',
      newEducation: '',
      newContact: '',
      error: '',
      // 6 arrays to keep track of our 6 statuses: Applied, Phone Screen, On site, Offered, Accepted, Rejected
      arrApplied: [],
      arrPhoneScreen: [],
      arrOnSite: [],
      arrOffered: [],
      arrAccepted: [],
      arrRejected: []
    };
  },

  async created() {
    // when start the web, load data in database according to the person's status
    try {
      let arrAll = await CardService.getCards();
      var i;
      for (i = 0; i < arrAll.length; i++) {
        if (arrAll[i].status == 'Applied'){
          this.arrApplied.push(arrAll[i]);
        } else if (arrAll[i].status == 'PhoneScreen') {
          this.arrPhoneScreen.push(arrAll[i]);
        } else if (arrAll[i].status == 'OnSite') {
          this.arrOnSite.push(arrAll[i]);
        } else if (arrAll[i].status == 'Offered') {
          this.arrOffered.push(arrAll[i]);
        } else if (arrAll[i].status == 'Accepted') {
          this.arrAccepted.push(arrAll[i]);
        } else if (arrAll[i].status == 'Rejected') {
          this.arrRejected.push(arrAll[i]);
        }
      }
      // this.arrApplied = await CardService.getCards();
    } catch(err) {
      this.error = err.messsage;
    }
  },

  methods: {
    async createCard() {
      // use form to create a new card, the status of the new card is applied, after creating reload the page
      await CardService.insertCard(this.newName, this.newEducation, this.newContact);
      this.newName = '';
      this.newEducation = '';
      this.newContact = '';

      location.reload();
      return false;
    },

    async deleteCard(id) {
      // delete a card by double click the card, after deleting reload the page
      await CardService.deleteCard(id);

      location.reload();
      return false;
    },

    async changeToApplied({ added }) {
      if (added) {
        // if yes, one card is dropped into Applied status, change its status, reload the page
        console.log(added.element._id + "change to Applied")
        await CardService.updateCard(added.element._id, 'Applied');

        location.reload();
        return false;
      }
    },

    async changeToPhoneScreen({ added }) {
      if (added) {
        console.log(added.element._id + "change to PhoneScreen")
        await CardService.updateCard(added.element._id, 'PhoneScreen');

        location.reload();
        return false;
      }
    },

    async changeToOnSite({ added }) {
      if (added) {
        console.log(added.element._id + "change to OnSite")
        await CardService.updateCard(added.element._id, 'OnSite');

        location.reload();
        return false;
      }
    },

    async changeToOffered({ added }) {
      if (added) {
        console.log(added.element._id + "change to Offered")
        await CardService.updateCard(added.element._id, 'Offered');

        location.reload();
        return false;
      }
    },

    async changeToAccepted({ added }) {
      if (added) {
        console.log(added.element._id + "change to Accepted")
        await CardService.updateCard(added.element._id, 'Accepted');

        location.reload();
        return false;
      }
    },

    async changeToRejected({ added }) {
      if (added) {
        console.log(added.element._id + "change to Rejected")
        await CardService.updateCard(added.element._id, 'Rejected');

        location.reload();
        return false;
      }
    }

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 500px;
}
</style>

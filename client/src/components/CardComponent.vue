<template>
  <div class="container mt-5">
    <h2>Kanban Board</h2>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>

    <!-- create card -->
    <div class="row">
      <div class="col form-inline">
        <b-form-input
          id="input-2"
          v-model="newName"
          required
          placeholder="Enter Name"
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="newEducation"
          required
          placeholder="Enter Education"
        ></b-form-input>

        <b-form-input
          id="input-2"
          v-model="newContact"
          required
          placeholder="Enter Contact"
        ></b-form-input>
        <b-button @click="createCard" variant="primary" class="ml-3">Add Candidate</b-button>
      </div>
    </div>


    <!-- show board -->
    <div class="row mt-5">
      <div class="col-2">
        <div class="p-2 alert alert-primary">
          <h5>Applied</h5>
          <!-- Backlog draggable component. Pass arrApplied to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrApplied"
            group="status"
          >
            <div
              class="list-group-item"
              v-for="element in arrApplied"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-warning">
          <h5>Phone Screen</h5>
          <!-- In Progress draggable component. Pass arrPhoneScreen to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrPhoneScreen"
            group="status"
          >
            <div
              class="list-group-item"
              v-for="element in arrPhoneScreen"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-info">
          <h5>On Site</h5>
          <!-- Testing draggable component. Pass arrOnSite to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrOnSite"
            group="status"
          >
            <div
              class="list-group-item"
              v-for="element in arrOnSite"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-danger">
          <h5>Offered</h5>
          <!-- Done draggable component. Pass arrOffered to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrOffered"
            group="status"
          >
            <div
              class="list-group-item"
              v-for="element in arrOffered"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-success">
          <h5>Accepted</h5>
          <!-- Done draggable component. Pass arrAccepted to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrAccepted"
            group="status"
          >
            <div
              class="list-group-item"
              v-for="element in arrAccepted"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-2">
        <div class="p-2 alert alert-secondary">
          <h5>Rejected</h5>
          <!-- Done draggable component. Pass arrRejected to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrRejected"
            group="status"
          >
            <div
              class="list-group-item"
              v-for="element in arrRejected"
              :key="element.name"
            >
              {{ element.name }}
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
    try {
      this.arrApplied = await CardService.getCards();
    } catch(err) {
      this.error = err.messsage;
    }
  },

  methods: {
    async createCard() {
      await CardService.insertCard(this.newName, this.newEducation, this.newContact);
      this.arrApplied = await CardService.getCards();
    }
    // async deleteCard(id) {
    //   await CardService.deleteCard(id);
    //   this.arrApplied = await CardService.getCards();
    // }
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

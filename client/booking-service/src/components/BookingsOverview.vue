<template>
  <v-container fluid>
    <template>
      <v-toolbar flat>
        <v-toolbar-title>Meine Buchungen</v-toolbar-title>
      </v-toolbar>
    </template>
    <v-data-table
      :headers="headers"
      :items="bookings"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.cancel="{ item }">
        <v-btn @click="cancelBooking(item.id.low)"> stornieren </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import ApiService from "../common/api-service";
export default {
  components: {},
  data: () => ({
    detailsDialog: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id.low",
      },
      { text: "Tag", value: "day" },
      { text: "Datum", value: "date" },
      { text: "Raum", value: "room" },
      { text: "Von", value: "from" },
      { text: "Bis", value: "until" },
      { text: "", value: "cancel" },
    ],
    bookings: [],
    testUserId: "LhlFb8g5C6hu8cTMntTdgyR4z7X2"
  }),
  created() {
    this.refreshBookings();
  },
  methods: {

    refreshBookings() {
      let userId = localStorage.getItem("current-user") ? localStorage.getItem("current-user").uid : this.testUserId;
      this.loading = true;
      ApiService.getMyBookings(userId).then((res) => {
        this.bookings = res;
        console.log(res);
      });
      this.loading = false;
    },

    cancelBooking(id) {
      ApiService.cancelSlot(id).then((res) => {
        this.refreshBookings();
        console.log(id + " canceled.");
      });
    },
  },
};
</script>

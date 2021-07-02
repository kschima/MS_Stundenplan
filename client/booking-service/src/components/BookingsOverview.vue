<template>
  <v-data-table
    :headers="headers"
    :items="bookings"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Meine Buchungen</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.cancel="{ item }">
      <v-btn @click="cancelBooking(item)">
        stornieren
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import ApiService from '@/common/api-service'
export default {
  components: { },
  data: () => ({
    detailsDialog: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Tag", value: "day" },
      { text: "Datum", value: "date" },
      { text: "Raum", value: "roomId" },
      { text: "Von", value: "from" },
      { text: "Bis", value: "until" },
      { text: "", value: "cancel" },
    ],
    bookings: []
  }),
  created() {
    this.refreshBookings();
  },
  methods: {
    initialize() {

    },

    refreshBookings () {
      this.loading = true;
      ApiService.getAllBookings().then(res => {
        this.bookings = res;
        console.log(res)
      });
      this.loading = false;
    },

    cancelBooking(item) {
      ApiService.deleteBooking(item.id).then(res => {
        this.refreshBookings();
        console.log(item.id + " canceled.");
      });      
    },

  }
};
</script>

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
      { text: "Raum", value: "room" },
      { text: "Von", value: "start" },
      { text: "Bis", value: "end" },
      { text: "", value: "cancel" },
    ],
    assessments: [],
    detailsIndex: -1,
    detailsItem: {
      id: "",
      day: "",
      date: "",
      room: "",
      end: "",
      cancel: ""
    }
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.bookings = [
        {
          id: "1",
          day: "Mittwoch",
          date: "07.06.2021",
          room: "Raum A001",
          start: "13:00 Uhr",
          end: "15:30 Uhr",
          cancel: ""
        }
      ]; 
    },

    cancelBooking(item) {
        console.log(item + " canceled.");
    },

  }
};
</script>

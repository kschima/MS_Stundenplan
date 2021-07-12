<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Raum buchen</v-toolbar-title>
    </v-toolbar>
    <v-col cols="12" sm="6" md="4">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Datum"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
          min="2021-07-04"
          max="2021-07-25"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="
              $refs.menu.save(date);
              refreshDayBookings();
            "
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-select
        :items="rooms"
        item-text="name"
        item-value="id"
        v-model="selectedRooms"
        label="Raum"
      ></v-select>
      <v-select
        :items="timeSlots"
        v-model="selectedFrom"
        label="Von"
      ></v-select>
      <v-select
        :items="timeSlots"
        v-model="selectedUntil"
        label="Bis"
      ></v-select>
      <v-btn @click="makeBooking()"> Buchen </v-btn>
    </v-col>
  </v-container>
</template>

<script>
import ApiService from "../common/api-service";
export default {
  components: {},
  data: () => ({
    rooms: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    bookingsDate: [],
    timeSlots: ["08:00", "10:00", "12:00"],
    selectedFrom: "",
    selectedUntil: "",
    selectedRoom: "",
    userId: "2",
  }),
  created() {
    this.refreshRooms();
    this.refreshDayBookings();
  },
  methods: {

    refreshRooms() {
      this.loading = true;
      ApiService.getAllRooms().then((res) => {
        this.rooms = res;
        console.log(res);
      });
      this.loading = false;
    },

    refreshDayBookings() {
      this.loading = true;
      ApiService.getBookingsByDate(this.date).then((res) => {
        this.bookingsDate = res;
        console.log(res);
      });
      this.loading = false;
    },
    getDayBookings(roomId) {
      return this.bookingsDate.filter(
        (item) => item.roomId == roomId && item.userId == ""
      );
    },
    makeBooking() {
      console.log(this.$refs.form);
      let booking = {
        id: "12",
        userId: this.userId,
        date: this.date,
        from: this.selectedFrom,
        until: this.selectedUntil,
        courseBooking: false,
        roomId: this.selectedRoom,
      };
      ApiService.createBooking(booking).then((res) => {
        this.refreshDayBookings();
        console.log(res);
      });
      this.$root.$emit('eventing', "something");
    },
  },
};
</script>

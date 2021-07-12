<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Verfügbare Räume</v-toolbar-title>
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
    </v-col>
    <v-data-iterator :items="dayBookings" item-key="room" sort-by="room">
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.room"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.room }}</h4>
              </v-card-title>
              <v-card-subtitle>
                {{ item.description }}
              </v-card-subtitle>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="slot in item.slots"
                  
                  v-bind:key="slot.properties.id"
                  :disabled="slot.properties.booked"
                  @click="book(slot.identity.low)"
                >
                  <v-list-item-content
                    >{{ slot.properties.from }} - {{ slot.properties.until }}</v-list-item-content
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import ApiService from "../common/api-service";
export default {
  components: {},
  data: () => ({
    dayBookings: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    testUserId: "LhlFb8g5C6hu8cTMntTdgyR4z7X2"
  }),
  created() {
    this.refreshMyBookings();
    this.refreshDayBookings();
  },
  methods: {

    refreshMyBookings() {
      console.log("refreshMyBookings")
    },

    refreshDayBookings() {
      this.loading = true;
      ApiService.getDayBooking(this.date).then((res) => {
        this.dayBookings = res;
        console.log(res);
      });
      this.loading = false;
    },

    book(id) {
      let userId = this.testUserId ;
      console.log("book " + id);
      console.log("userID: " + userId)
      let data = {userId: userId};
      ApiService.book(id, data).then((res) => {
        this.refreshDayBookings();
      });
    },

  },
};
</script>

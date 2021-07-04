<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Verfügbare Räume</v-toolbar-title>
    </v-toolbar>
    <v-data-iterator :items="rooms" item-key="name" sort-by="name">
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.name }}</h4>
              </v-card-title>
              <v-card-subtitle>
                {{ item.description }}
              </v-card-subtitle>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.calories }}
                  </v-list-item-content>
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
    rooms: [],
  }),
  created() {
    this.refreshRooms();
  },
  methods: {
    initialize() {},

    refreshRooms() {
      this.loading = true;
      ApiService.getAllRooms().then((res) => {
        this.rooms = res;
        console.log(res);
      });
      this.loading = false;
    },
  },
};
</script>

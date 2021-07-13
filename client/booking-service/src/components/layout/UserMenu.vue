<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="white" v-bind="attrs" v-on="on" x-large>mdi-account-circle</v-icon>
        <div class="white--text">{{ getUsername() }}</div>
      </template>
      
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ],
    testUser: {"uid":"LhlFb8g5C6hu8cTMntTdgyR4z7X2","firstname":"Julia","lastname":"Meier","role":1}
  }),
  methods: {
    getUsername() {
      let currentUser = JSON.parse(localStorage.getItem("current-user"));
      return currentUser.firstname + " " + currentUser.lastname
    },
  },
};
</script>

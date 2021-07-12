<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" x-large>mdi-account-circle</v-icon>
        {{ getUsername() }}
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
    ]
  }),
  methods: {
    getUsername() {
      let currentUser = this.$cookies.get('current-user');
      return currentUser.firstname + " " + currentUser.lastname;
    },
  },
};
</script>

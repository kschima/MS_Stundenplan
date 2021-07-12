<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-layout column wrap align-items-center>
        <v-icon x-large>mdi-school</v-icon>
        <h3 class="logo__text">ILIAS 2.0</h3>
      </v-layout>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :href="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <h2>Raumbuchung</h2>
      <v-spacer></v-spacer>
      <user-menu></user-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <Bookings/>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>

import UserMenu from "./components/layout/UserMenu.vue";
import Bookings from "./components/Bookings.vue"
export default {
  components: { UserMenu, Bookings },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          title: "Startseite",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/"
        },
        {
          title: "Nachrichten",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages/"
        },
        {
          title: "Kurse",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses/"
        },
        {
          title: "Termine",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/appointments/"
        },
        {
          title: "Prüfungen",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/exams/"
        },
        {
          title: "Raumbuchung",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/bookings/"
        },
        {
          title: "Ausloggen",
          to: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/"
        }
      ],
      accountMenuItems: [
        {
          title: "Mein Account"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "ILIAS 2.0"
    };
  }
};
</script>

<style>
.logo__text,
.user--name {
  text-align: center;
}
</style>

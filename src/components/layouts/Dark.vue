<template>
  <v-app id="inspire">
    <!-- Sidebar Navigation -->
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-tile v-for="view in views" :key="view.title" :to="view.link">
          <v-list-tile-action>
            <v-icon>{{view.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{view.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Top Toolbar -->
    <v-toolbar color="deep-orange" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Chyco Admin</v-toolbar-title>
    </v-toolbar>

    <!-- Main Content -->
    <v-container>
      <router-view></router-view>
    </v-container>

    <!-- Footer -->
    <!-- <v-footer color="deep-orange" app fixed>
      <span id="footer-text">Chyco Supermarkt&copy; 2019</span>
    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    views: [
      { title: "Dashboard", icon: "dashboard", link: "/" },
      { title: "Products", icon: "local_grocery_store", link: "products" },
      { title: "Companies", icon: "business", link: "/companies" },
      { title: "Cashflow", icon: "attach_money", link: "/cashflow" },
      { title: "Balance", icon: "timeline", link: "/balance" }
    ]
  }),
  props: {
    source: String
  }
};
</script>

<style>
#footer-text {
  margin-left: 20px;
}

#inspire {
  max-height: calc(100vh - 64px);
}
</style>

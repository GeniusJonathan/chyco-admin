<template>
  <div id="application">
    <!-- <Sidenav/> -->
    <v-app>
      <v-content>
        <!-- <v-container fluid>
          <router-view></router-view>
        </v-container> -->
        <!-- <Baseline /> -->
        <Dark />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Sidenav from "@/components/layouts/Sidenav.vue";
import Baseline from "@/components/layouts/Baseline.vue";
import Dark from "@/components/layouts/Dark.vue";
import Products from "@/views/Products.vue";
import ProductsTable from "@/components/ProductsTable.vue";

export default {
  name: "app",
  components: {
    // Sidenav,
    Dark,
    // Baseline,
    // Products,
    ProductsTable
  }
};
</script>


<style>
#application {
  overflow: hidden;
}
</style>

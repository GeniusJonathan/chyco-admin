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

export default {
  name: "app",
  components: {
    Sidenav,
    Dark,
    Baseline
  }
};
</script>


<style>
#application {
  overflow: hidden;
}
</style>

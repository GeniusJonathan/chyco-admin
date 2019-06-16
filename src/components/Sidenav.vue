<template>
  <v-navigation-drawer height="100vh"
    class="teal darken-1"
    dark
    permanent
  >
  
    <v-list>
        <v-list-tile>
            <h1>Chyco</h1>
        </v-list-tile>
        
      <v-list-tile
        v-for="item in items"
        :key="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Sidenav',
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'dashboard' },
          { title: 'Account', icon: 'account_box' },
          { title: 'Admin', icon: 'gavel' }
        ]
      }
    }
  }
</script>
<template>
	
   <v-flex xs12>
      <v-autocomplete
         v-model="friends"
         :disabled="isUpdating"
         :items="people"
         box
         chips
         color="blue lighten-2"
			background-color="white"
         label="Select"
         item-text="name"
         item-value="name"
         multiple
      >
			<!-- Selected Items -->
         <template v-slot:selection="data">
            <v-chip
               :selected="data.selected"
               close
               class="chip--select-multi"
               @input="remove(data.item)"
            >{{ data.item.name }}</v-chip>
         </template>
			<!-- List with values -->
         <template v-slot:item="data">
            <template>
               <v-list-tile-content>
                  {{data.item.name}}
               </v-list-tile-content>
            </template>
         </template>
      </v-autocomplete>
		<div>{{(this.friends).join(' , ')}}</div>
   </v-flex>
</template>

<script>
export default {
   data() {
      const srcs = {
         1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
         2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
         3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
         4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
         5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
      };

      return {
         friends: ["Sandra Adams", "Britta Holt"],
         isUpdating: false,
         name: "Midnight Crew",
         people: [
            { header: "Group 1" },
            { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
            { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
            { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
            { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
            { divider: true },
            { header: "Group 2" },
            { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
            { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
            { name: "John Smith", group: "Group 2", avatar: srcs[1] },
            { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
         ]
      };
   },

   watch: {
      isUpdating(val) {
         if (val) {
            setTimeout(() => (this.isUpdating = false), 3000);
         }
      }
   },

   methods: {
      remove(item) {
         const index = this.friends.indexOf(item.name);
         if (index >= 0) this.friends.splice(index, 1);
      }
   }
};
</script>

<style>
</style>

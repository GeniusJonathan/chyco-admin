  <template>
   <div>
      <v-toolbar flat color="white">
         <v-toolbar-title>Companies</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
               <v-btn color="primary" dark class="mb-2" v-on="on">
                  <v-icon>add</v-icon>New Item
               </v-btn>
            </template>
            <v-form ref="form">
               <v-card>
                  <v-card-title>
                     <span class="headline">{{formTitle}}</span>
                  </v-card-title>
                  <v-card-text>
                     <v-container grid-list-md>
                        <v-layout wrap>
                           <v-flex xs12>
                              <v-text-field
                                 v-model="editedItem.name"
                                 :rules="nameRules"
                                 label="Name*"
                                 required
                              ></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.contactPerson" label="Contact Person"></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.contactNumber" label="Contact Number"></v-text-field>
                           </v-flex>
                        </v-layout>
                     </v-container>
                     <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
                     <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                  </v-card-actions>
               </v-card>
            </v-form>
         </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="allCompanies" hide-actions class="elevation-1">
         <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.address }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.contactPerson }}</td>
            <td>{{ props.item.contactNumber }}</td>
            <td class="justify-center layout px-0">
               <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
               <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
         </template>
      </v-data-table>
   </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
   data: () => ({
      dialog: false,
      nameRules: [
         v => !!v || "Name is required",
         v => (v && v.length <= 50) || "Name must be less than 20 characters"
      ],
      headers: [
         { text: "Name", value: "name", align: "left", sortable: true },
         { text: "Address", value: "address", align: "left" },
         { text: "Phone", value: "phone", align: "left" },
         { text: "Contact Person", value: "contactPerson", align: "left" },
         { text: "Contact Number", value: "contactNumber", align: "left" },
         { text: "Actions", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
         id: "",
         name: "",
         address: "",
         phone: "",
         contactPerson: "",
         contactNumber: ""
      }
   }),

   computed: {
      ...mapGetters(["allCompanies"]),
      formTitle() {
         return this.editedIndex === -1 ? "New Item" : "Edit Item";
      }
   },

   watch: {
      dialog(val) {
         val || this.close();
      }
   },

   created() {
      this.fetchCompanies();
   },

   methods: {
      ...mapActions([
         "fetchCompanies",
         "addCompany",
         "updateCompany",
         "deleteCompany"
      ]),
      addNewCompany() {
         let company = {
            name: this.editedItem.name,
            address: this.editedItem.address,
            phone: this.editedItem.phone,
            contactPerson: this.editedItem.contactPerson,
            contactNumber: this.editedItem.contactNumber
         };
         if (this.$refs.form.validate()) {
            this.addCompany(company);
            this.close();
         }
      },
      editItem(item) {
         this.editedIndex = 1; // TODO: set to positive value to signal modal in EDIT mode
         this.editedItem = Object.assign({}, item);
         this.dialog = true;
      },

      deleteItem(item) {
         let confirmDelete = confirm(
            "Are you sure you want to delete this item?"
         );
         if (confirmDelete) {
            this.deleteCompany(item.id);
         }
      },

      close() {
         this.dialog = false;
         setTimeout(() => {
            this.$refs.form.reset();
            this.editedIndex = -1;
         }, 300);
      },

      save() {
         if (this.editedIndex > -1) {
            // Modify Company
            if (this.$refs.form.validate()) {
               this.updateCompany(this.editedItem);
               this.close();
            }
         } else {
            // Add New Company
            this.addNewCompany();
         }
      }
   }
};
</script>
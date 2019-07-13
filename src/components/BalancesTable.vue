  <template>
   <div>
      <v-toolbar flat color="white">
         <v-toolbar-title>Balance Report</v-toolbar-title>
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
                              <v-menu
                                 v-model="menu"
                                 :close-on-content-click="false"
                                 :nudge-right="40"
                                 lazy
                                 transition="scale-transition"
                                 offset-y
                                 full-width
                                 min-width="290px"
                              >
                                 <template v-slot:activator="{ on }">
                                    <v-text-field
                                       v-model="editedItem.date"
                                       label="Date*"
                                       prepend-icon="event"
                                       v-on="on"
                                    ></v-text-field>
                                 </template>
                                 <v-date-picker v-model="editedItem.date" @input="menu = false"></v-date-picker>
                              </v-menu>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field
                                 v-model="editedItem.start_amount"
                                 label="Start Amount*"
                                 :rules="amountRules"
                                 validate-on-blur
                                 required
                              ></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.incoming" label="Incoming*" :rules="amountRules" validate-on-blur required></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.outgoing" label="Outgoing*" :rules="amountRules" validate-on-blur required></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field
                                 v-model="editedItem.end_amount"
                                 label="End Amount*"
                                 :rules="amountRules"
                                 validate-on-blur
                                 required
                              ></v-text-field>
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
      <v-data-table :headers="headers" :items="allBalances" hide-actions class="elevation-1">
         <template v-slot:items="props">
            <td>{{ props.item.date }}</td>
            <td class="text-xs-right">{{ props.item.start_amount }}</td>
            <td class="text-xs-right">{{ props.item.incoming }}</td>
            <td class="text-xs-right">{{ props.item.outgoing }}</td>
            <td class="text-xs-right">{{ props.item.end_amount }}</td>
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
      menu: false,
      nameRules: [
         v => !!v || "Name is required",
         v => (v && v.length <= 50) || "Name must be less than 20 characters"
      ],
      amountRules: [
         v => !!v || "Name is required",
         // v => (v && v.length <= 50) || "Name must be less than 20 characters",
         v =>
            /^\D?\s*\d*([,.]?\d{3})*[,.]\d{2}$/.test(v) ||
            "Must be a two decimal value"
      ],
      headers: [
         { text: "Date", value: "date", align: "left", sortable: true },
         { text: "Start Amount", value: "startAmount", align: "right" },
         { text: "Incoming", value: "incoming", align: "right" },
         { text: "Outgoing", value: "outgoing", align: "right" },
         { text: "End Amount", value: "endAmount", align: "right" },
         { text: "Actions", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
         id: "",
         date: new Date().toISOString().substr(0, 10),
         start_amount: "",
         incoming: "",
         outgoing: "",
         end_amount: ""
      },
      defaultItem: {
         id: "",
         date: new Date().toISOString().substr(0, 10),
         start_amount: "",
         incoming: "",
         outgoing: "",
         end_amount: ""
      }
   }),

   computed: {
      ...mapGetters(["allBalances"]),
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
      this.fetchBalances();
   },

   methods: {
      ...mapActions([
         "fetchBalances",
         "addBalance",
         "updateBalance",
         "deleteBalance"
      ]),
      addNewBalance() {
         let balance = {
            date: this.editedItem.date,
            start_amount: this.editedItem.start_amount,
            incoming: this.editedItem.incoming,
            outgoing: this.editedItem.outgoing,
            end_amount: this.editedItem.end_amount
         };
         if (this.$refs.form.validate()) {
            this.addBalance(balance);
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
            this.deleteBalance(item.id);
         }
      },
      close() {
         this.dialog = false;
         setTimeout(() => {
            this.$refs.form.resetValidation();
            this.editedIndex = -1;
            this.editedItem = Object.assign({}, this.defaultItem);
         }, 300);
      },
      save() {
         if (this.editedIndex > -1) {
            // Modify Balance
            if (this.$refs.form.validate()) {
               this.updateBalance(this.editedItem);
               this.close();
            }
         } else {
            // Add New Balance
            this.addNewBalance();
         }
      }
   }
};
</script>
  <template>
   <div>
      <v-toolbar flat color="white" style="padding-top: 20px;">
         <v-toolbar-title>Cashflows for</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-menu
            style="margin-top: 40px"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            full-width
            min-width="290px"
         >
            <template v-slot:activator="{ on }">
               <v-text-field v-model="search" label="Date" prepend-icon="event" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="dateSelected"></v-date-picker>
         </v-menu>
      </v-toolbar>
      <v-data-table
         :headers="headers"
         :items="allCashflows"
         :search="search"
         hide-actions
         class="elevation-1"
      >
         <template v-slot:items="props">
            <td>{{ props.item.date }}</td>
            <td>{{ props.item.source }}</td>
            <td>{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
            <td style="font-size: x-large;">{{ props.item.type === 'Outgoing'? '-': '' }}</td>
            <td class="justify-center layout px-0">
               <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
               <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
         </template>

         <template v-slot:footer v-if="canPrintZreport()">
            <!-- <td :colspan="headers.length">
               <strong>This is an extra footer</strong>
            </td>-->
            <td></td>
            <td></td>
            <td class="text-xs-left">
               <b>Total:</b>
            </td>
            <td class="text-xs-right total">{{getTotal}}</td>
            <td class="total"></td>
            <td></td>
         </template>
      </v-data-table>

      <div id="actionBar">
         <!-- ADD ROW > Pops a dialog to add a cashflow row -->
         <v-dialog v-model="dialog" min-width="600">
            <!-- ADD ROW Button -->
            <template v-slot:activator="{ on }">
               <v-btn style="margin: 5px 0;" color="primary" dark class="mb-2" v-on="on">
                  <v-icon>add</v-icon>Add row
               </v-btn>
            </template>
            <!-- FORM -->
            <v-form ref="form">
               <v-card>
                  <v-card-title>
                     <span class="headline">Add Row</span>
                  </v-card-title>
                  <v-card-text>
                     <v-container grid-list-md>
                        <v-layout wrap>
                           <v-flex xs12>
                              <v-menu
                                 v-model="menu2"
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
                                       label="Date"
                                       prepend-icon="event"
                                       v-on="on"
                                    ></v-text-field>
                                 </template>
                                 <v-date-picker v-model="editedItem.date" @input="menu2 = false"></v-date-picker>
                              </v-menu>
                           </v-flex>
                           <v-flex xs8>
                              <v-text-field v-model="editedItem.source" label="Source" clearable></v-text-field>
                           </v-flex>
                           <v-flex class="helper" xs4>
                              <v-select
                                 v-model="selectedCompany"
                                 :items="getCompanyNames"
                                 menu-props="auto"
                                 label="Companies"
                                 hide-details
                                 @input="this.changeSourceValue"
                                 prepend-icon="search"
                              ></v-select>
                           </v-flex>
                           <v-flex xs8>
                              <v-textarea
                                 name="input-7-1"
                                 label="Info"
                                 v-model="editedItem.description"
                              ></v-textarea>
                           </v-flex>
                           <v-flex class="helper" xs4 align-self-end>
                              <v-autocomplete
                                 v-model="selectedProduct"
                                 :items="getProductNames"
                                 single-line
                                 label="Products"
                                 @input="this.changeDescriptionValue"
                                 prepend-icon="search"
                                 clearable
                              ></v-autocomplete>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field
                                 v-model="editedItem.amount"
                                 label="Amount"
                                 :rules="amountRules"
                                 validate-on-blur
                              ></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-switch
                                 v-model="editedItem.type"
                                 :label="`Type: ${editedItem.type}`"
                                 append-icon="swap_horiz"
                                 false-value="Outgoing"
                                 true-value="Incoming"
                                 color="success"
                              ></v-switch>
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
         <v-btn
            v-if="canPrintZreport()"
            color="green lighten-1"
            @click="printZreport(search, getIncoming, getOutgoing, getTotal )"
         >Z - Report</v-btn>
      </div>
   </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
   data: () => ({
      dialog: false,
      companies: ["test", "jon"],
      cashflows: [],
      selectedCompany: "",
      selectedProduct: "",
      search: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      amountRules: [
         v => !!v || "Name is required",
         // v => (v && v.length <= 50) || "Name must be less than 20 characters",
         v =>
            /^\D?\s*\d*([,.]?\d{3})*[,.]\d{2}$/.test(v) ||
            "Must be a two decimal value"
      ],
      headers: [
         { text: "Date", value: "date", align: "left", sortable: true },
         { text: "Source", value: "source", align: "left" },
         { text: "Description", value: "description", align: "left" },
         { text: "Amount", value: "amount", align: "right" },
         { text: "", value: "type", align: "left" },
         { text: "Actions", value: "actions" }
      ],
      editedIndex: -1,
      editedItem: {
         id: "",
         date: new Date().toISOString().substr(0, 10),
         source: "",
         description: "",
         amount: "",
         type: "Outgoing"
      },
      defaultItem: {
         id: "",
         date: new Date().toISOString().substr(0, 10),
         source: "",
         description: "",
         amount: "",
         type: "Outgoing"
      }
   }),

   computed: {
      ...mapGetters([
         "allCashflows",
         "getCompanyNames",
         "getProductNames",
         "getLastBalance"
      ]),
      formTitle() {
         return this.editedIndex === -1 ? "New Item" : "Edit Item";
      },
      getIncoming() {
         let incomingValues = this.allCashflows
            .filter(x => x.date === this.date && x.type === "Incoming")
            .map(x => x.amount);
         let total = 0;
         if (incomingValues.length > 0) {
            total = incomingValues.reduce((a, b) => Number(a) + Number(b));
         }
         return Number.parseFloat(total).toFixed(2);
      },
      getOutgoing() {
         let incomingValues = this.allCashflows
            .filter(x => x.date === this.date && x.type === "Outgoing")
            .map(x => x.amount);
         let total = 0;
         if (incomingValues.length > 0) {
            total = incomingValues.reduce((a, b) => Number(a) + Number(b));
         }
         return Number.parseFloat(total).toFixed(2);
      },
      getTotal() {
         let total = this.getIncoming - this.getOutgoing;
         return Number.parseFloat(total).toFixed(2);
      }
   },

   watch: {
      dialog(val) {
         val || this.close();
      }
   },

   created() {
      this.fetchCashflows();
      this.fetchCompanies();
      this.fetchProducts();
      this.fetchLastBalance();
   },
   mounted() {
      this.cashflows = this.allCashflows;
      this.lastBalance = this.getLastBalance;
   },
   methods: {
      ...mapActions([
         "fetchCashflows",
         "fetchCompanies",
         "fetchProducts",
         "addCashflow",
         "updateCashflow",
         "deleteCashflow",
         "fetchLastBalance",
         "addBalance"
      ]),
      changeSourceValue() {
         this.editedItem.source = this.selectedCompany;
      },
      changeDescriptionValue(item) {
         if (item) {
            if (this.editedItem.description.length < 1) {
               this.editedItem.description = this.selectedProduct;
            } else {
               this.editedItem.description += "  ,  " + this.selectedProduct;
            }
         }
      },
      addNewCashflow() {
         let cashflow = {
            date: this.editedItem.date,
            source: this.editedItem.source,
            description: this.editedItem.description,
            amount: this.editedItem.amount,
            type: this.editedItem.type
         };
         if (this.$refs.form.validate()) {
            this.addCashflow(cashflow);
            this.close();
         }
      },
      dateSelected() {
         this.menu1 = false;
         this.search = this.date;
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
            this.deleteCashflow(item.id);
         }
      },

      close() {
         this.dialog = false;
         setTimeout(() => {
            this.$refs.form.resetValidation();
            this.editedIndex = -1;
            this.editedItem = Object.assign({}, this.defaultItem);
            this.selectedCompany = "";
            this.selectedProduct = "";
         }, 300);
      },
      save() {
         if (this.editedIndex > -1) {
            // Modify Cashflow
            if (this.$refs.form.validate()) {
               this.updateCashflow(this.editedItem);
               this.close();
            }
         } else {
            // Add New Cashflow
            this.addNewCashflow();
         }
      },
      printZreport(date, incoming, outgoing, total) {
         let confirmZreport = confirm("Are you sure?");
         if (confirmZreport) {
            let endAmount = +this.getLastBalance + +total;

            let balance = {
               date: date,
               start_amount: this.getLastBalance,
               incoming: incoming,
               outgoing: outgoing,
               end_amount: Number.parseFloat(endAmount).toFixed(2)
            };
            this.addBalance(balance);
         }
      },
      canPrintZreport() {
         var regex = RegExp(
            /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
         );
         return regex.test(this.search);
      }
   }
};
</script>

<style>
.helper {
   border: 3px grey dashed;
   background-color: #eeeeee;
}

.total {
   border-top: 2px solid black;
}

#actionBar {
   display: flex;
   justify-content: space-between;
}
</style>

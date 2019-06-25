  <template>
   <div>
      <v-toolbar flat color="white">
         <v-toolbar-title>Products</v-toolbar-title>
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
                     <span class="headline">Add Product</span>
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
                              <v-text-field
                                 v-model="editedItem.brand"
                                 :rules="brandRules"
                                 label="Brand*"
                                 required
                              ></v-text-field>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field
                                 v-model="editedItem.company"
                                 :rules="companyRules"
                                 label="Company*"
                                 required
                              ></v-text-field>
                           </v-flex>
                           <v-flex xs12 sm6>
                              <v-select
                                 v-model="editedItem.category"
                                 :items="categoryList"
                                 label="Category"
                              ></v-select>
                           </v-flex>
                           <v-flex xs12>
                              <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
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
      <v-data-table :headers="headers" :items="allProducts" hide-actions class="elevation-1">
         <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.brand }}</td>
            <td>{{ props.item.company }}</td>
            <td>{{ props.item.category }}</td>
            <td>{{ props.item.description }}</td>
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
         v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      brandRules: [
         v => !!v || "Brand is required",
         v => (v && v.length <= 10) || "Brand must be less than 10 characters"
      ],
      companyRules: [
         v => !!v || "Company is required",
         v => (v && v.length <= 20) || "Company must be less than 20 characters"
      ],
      categoryList: ["Food & Drinks", "Snacks", "Prepaid Cards", "Other"],
      headers: [
         { text: "Name", align: "left", sortable: true, value: "name" },
         { text: "Brand", value: "brand", align: "left", sortable: true },
         { text: "Company", value: "company", align: "left", sortable: true },
         { text: "Category", value: "category", align: "left" },
         { text: "Description", value: "description", align: "left" },
         { text: "Actions", value: "name", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
         id: "",
         name: "",
         brand: "",
         company: "",
         category: "",
         description: ""
      }
   }),

   computed: {
      ...mapGetters(["allProducts"]),
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
      this.fetchProducts();
   },

   methods: {
      ...mapActions([
         "fetchProducts",
         "addProduct",
         "updateProduct",
         "deleteProduct"
      ]),
      addNewProduct() {
         let product = {
            name: this.editedItem.name,
            brand: this.editedItem.brand,
            company: this.editedItem.company,
            category: this.editedItem.category,
            description: this.editedItem.description
         };
         if (this.$refs.form.validate()) {
            this.addProduct(product);
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
            this.deleteProduct(item.id);
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
            // Modify Product
            this.updateProduct(this.editedItem);
         } else {
            // Add new Product
            this.addNewProduct();
         }
         this.close();
      }
   }
};
</script>
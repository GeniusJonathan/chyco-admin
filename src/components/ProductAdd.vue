<template>
   <v-layout row justify-left>
      <v-dialog v-model="dialog" persistent max-width="600px">
         <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Add Product</v-btn>
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
                           <v-text-field v-model="name" :rules="nameRules" label="Name*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                           <v-text-field
                              v-model="brand"
                              :rules="brandRules"
                              label="Brand*"
                              required
                           ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                           <v-text-field
                              v-model="company"
                              :rules="companyRules"
                              label="Company*"
                              required
                           ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                           <v-select v-model="category" :items="categoryList" label="Category"></v-select>
                        </v-flex>
                        <v-flex xs12>
                           <v-text-field v-model="description" label="Description"></v-text-field>
                        </v-flex>
                     </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
               </v-card-text>
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="saveProduct">Save</v-btn>
               </v-card-actions>
            </v-card>
         </v-form>
      </v-dialog>
   </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
   data: () => ({
      dialog: false,
      name: "",
      nameRules: [
         v => !!v || "Name is required",
         v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      brand: "",
      brandRules: [
         v => !!v || "Brand is required",
         v => (v && v.length <= 10) || "Brand must be less than 10 characters"
      ],
      description: "",
      company: "",
      companyRules: [
         v => !!v || "Company is required",
         v => (v && v.length <= 20) || "Company must be less than 20 characters"
      ],
      category: "",
      categoryList: ["Food & Drinks", "Snacks", "Prepaid Cards", "Other"]
   }),
   methods: {
      ...mapActions(["addProduct"]),
      saveProduct() {
         let product = {
            name: this.name,
            brand: this.brand,
            company: this.company,
            category: this.category,
            description: this.description
         };
         if (this.$refs.form.validate()) {
            this.$refs.form.reset();
            this.addProduct(product);
            this.dialog = false;
         }
      }
   }
};
</script>
<template>
   <div>
      <h1>Products</h1>
      <p>This view display a list of products. In this view we can also do CRUD operations on products.</p>
      <hr>
      <ProductAdd />
      <ul>
         <li :key="product.id" v-for="product in allProducts">{{product.name}}</li>
      </ul>
   </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductAdd from "@/components/ProductAdd.vue";
export default {
   components: {
     ProductAdd
   },
   methods: {
    ...mapActions(["fetchProducts"])
   },
   computed: mapGetters(["allProducts"]),
   created() {
     this.fetchProducts();
   }
};
</script>

<style>
</style>

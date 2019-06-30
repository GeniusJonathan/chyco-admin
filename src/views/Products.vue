<template>
   <div>
      <h1>Products</h1>
      <p>This view display a list of products. In this view we can also do CRUD operations on products.</p>
      <hr>
      <!-- <ProductAdd /> -->
      <ProductsTable />
   </div>
</template>

<script>
import ProductAdd from "@/components/ProductAdd";
import ProductsTable from "@/components/ProductsTable";
export default {
   components: {
     ProductAdd,
     ProductsTable
   }
};
</script>

<style>
</style>

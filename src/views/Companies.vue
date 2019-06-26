<template>
  <div>
    <h1>Companies</h1>
    <p>This view display a list of companies. In this view we can also do CRUD operations on companies.</p>
    <hr>
    <CompaniesTable />
  </div>
</template>

<script>
import CompaniesTable from "@/components/CompaniesTable";
export default {
  components: {
     CompaniesTable
   }
};
</script>

<style>
</style>

<template>
   <div>
      <h1>Cashflow</h1>
      <p>This view display a list of cashflows. In this view we can also do CRUD operations on cashflows.</p>
      <hr>
      <CashflowTable/>
   </div>
</template>

<script>
import CashflowTable from "@/components/CashflowTable";

export default {
   components: {
      CashflowTable
   }
};
</script>

<style>
</style>
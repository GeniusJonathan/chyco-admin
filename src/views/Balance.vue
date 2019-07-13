<template>
  <div>
    <h1>Balance</h1>
    <p>This view display a list of Balance by day.</p>
    <BalancesTable />
  </div>
</template>

<script>
import BalancesTable from "@/components/BalancesTable";

export default {
   components: {
      BalancesTable
   }
};
</script>

<style>
</style>

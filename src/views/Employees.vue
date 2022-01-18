<template>
  <div class="about">
    <h1>This is an Employee page</h1>
    <EmployeeGrid />
  </div>
</template>
<script>
import EmployeeGrid from "../components/EmployeeGrid.vue";

export default {
  components: {
    EmployeeGrid,
  },
};
</script>

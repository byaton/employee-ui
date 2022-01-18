<template>
  <div class="about">
    <h1>This is a create Employee page</h1>
    <form>
      <span>{{ genEmpId }}</span>
      <input type="text" placeholder="FullName" v-model="eName" />
      <input
        type="button"
        :disabled="enableStatus"
        value="submit"
        @click="
          saveEmployee({
            id: genEmpId,
            name: eName,
          })
        "
      />
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      eName: this.employeeName,
      emplName: "",
      genEmpId:
        this.employeeId ||
        Math.max(this.$store.state.empList.map((m) => m.id)) + 1,
      //enableStatus: !!this.genEmpId && !!this.eName,
    };
  },
  methods: {
    ...mapActions(["saveEmployee", "getEmployees"]),
    // submitClick: async (empId, empName) => {
    //   console.log("Amit3", empId, empName);
    //   // await this.saveEmployee(empId, empName);

    //   // await this.$store.dispatch("saveEmployee", {
    //   //   id: empId,
    //   //   name: empName,
    //   // });
    // },
  },
  props: ["employeeId", "employeeName"],
  mounted() {
    this.$store.dispatch("getEmployees");
  },
  computed: {
    ...mapState["empList"],
    enableStatus() {
      console.log("Amit12", this);
      return !this.genEmpId || !this.eName;
    },
    // submitClick() {
    //   console.log("Amit3", this.genEmpId, this.eName);
    //   const employeeId = this.genEmpId;
    //   const employeeName = this.eName;
    //   this.saveEmployee({employeeId, employeeName});
    //   return true;
    // },
  },
};
</script>

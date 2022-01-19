<template>
  <div class="about">
    <h1>This is a create Employee page</h1>
    <form>
      <span>{{ genEmpId }}</span>
      <input type="text" placeholder="FullName" v-model="eName" />
      <input
        type="button"
        :disabled="enableStatus"
        :value="buttonText"
        @click="
          saveEmployee({
            id: genEmpId,
            name: eName,
            isUpdate,
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
      buttonText: this.employeeId ? "Update" : "Submit",
      isUpdate: !!this.employeeId,
    };
  },
  methods: {
    ...mapActions(["saveEmployee", "getEmployees"]),
  },
  props: ["employeeId", "employeeName"],
  mounted() {
    if (this.$store.state.empList.length === 0) {
      this.$store.dispatch("getEmployees");
    }
  },
  computed: {
    ...mapState["empList"],
    enableStatus() {
      return !this.genEmpId || !this.eName;
    },
    genEmpId() {
      let retEmpId = 0;
      retEmpId = this.employeeId || retEmpId;
      const storeEmpList = this.$store.state.empList;
      if (storeEmpList.length > 0 && retEmpId === 0) {
        retEmpId = Math.max(...storeEmpList.map((m) => m.id)) + 1;
      }

      return retEmpId;
    },
  },
};
</script>

<template>
  <div class="about">
    <h1>This is a create Project page</h1>
    <form>
      {{ genProjectId }}
      <input type="text" placeholder="Project Name" v-model="pName" />
      <input
        type="text"
        placeholder="Project Description"
        v-model="pDescription"
      />
      <input type="date" v-model="pDate" />
      <select
        id="emp"
        name="employees"
        size="5"
        v-model="empList"
        multiple="true"
      >
        <option
          :key="index"
          v-for="(emp, index) in employeeList"
          :value="emp.id"
        >
          {{ emp.name }}
        </option>
      </select>
      <br />
      {{ employeeList }}
      <br />
      <input
        type="button"
        :disabled="enableStatus"
        value="Submit"
        @click="
          saveProject({
            id: genProjectId,
            name: pName,
            description: pDescription,
            date: pDate,
            empIds: empList,
          })
        "
      />
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      genProjectId:
        this.projectId ||
        Math.max(this.$store.state.projectList.map((m) => m.id)) + 2,
      pName: this.projectName,
      pDescription: this.projectDescription,
      pDate: this.projectStartDate,
      employeeList: this.$store.state.empList,
    };
  },
  methods: {
    ...mapActions(["getEmployees", "getProjects", "saveProject"]),
    // onSubmit: (name, description, date, projectid) => {
    //   console.log("Amit5", name, description, date, projectid);
    //   // console.log("Amit7", this.empList);
    //   //this.$store.dispatch("getProjects");
    // },
    // handleOnChange: (e) => {
    //   console.log("Amit91", this);
    //   const objKeys = Object.keys(e.target.options);
    //   objKeys.forEach((m) => {
    //     console.log("Amit9", e.target.options[m].value, e.target.options[m].selected);
    //   });
    // },
  },
  props: [
    "projectId",
    "projectName",
    "projectDescription",
    "projectStartDate",
    "projectEmployees",
  ],
  mounted() {
    if (this.$store.state.empList.length === 0) {
      this.$store.dispatch("getEmployees");
    }
  },
  computed: {
    ...mapState["empList"],
    enableStatus() {
      return !this.pName || !this.pDescription || !this.pDate;
    },
    // selectedEmployee: function (e) {
    //   console.log("Amit91", e.target.options);
    //   const objKeys = Object.keys(e.target.options);
    //   objKeys.forEach((m) => {
    //     console.log("Amit9", m, e.target.options[m].selected);
    //   });
    //   return ["1", "2"];
    // },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

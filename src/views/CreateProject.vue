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
      <br />
      <input
        type="button"
        :disabled="enableStatus"
        :value="buttonText"
        @click="
          saveProject({
            id: genProjectId,
            name: pName,
            description: pDescription,
            date: pDate,
            empIds: empList,
            isUpdate,
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
      pName: this.projectName,
      pDescription: this.projectDescription,
      pDate: this.projectStartDate,
      employeeList: this.$store.state.empList,
      empList: this.projectEmployees,
      buttonText: this.projectId ? "Update" : "Submit",
      isUpdate: !!this.projectId,
    };
  },
  methods: {
    ...mapActions(["getEmployees", "getProjects", "saveProject"]),
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
    genProjectId() {
      let retProjId = 0;
      retProjId = this.projectId || retProjId;
      const storeProjList = this.$store.state.projectList;
      if (storeProjList.length > 0 && retProjId === 0) {
        retProjId = Math.max(...storeProjList.map((m) => m.id)) + 1;
      }

      return retProjId;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

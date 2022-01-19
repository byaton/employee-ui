<template>
  <div class="all-form">
    <h1>This is a create Project page</h1>
    <form>
      <div class="page-data">
        <div class="page-label">
          <label>Project ID</label>
          <label>Project Name</label>
          <label>Project Description</label>
          <label>Start Date</label>
          <label>Employee IDs</label>
        </div>
        <div class="page-label">
          <span>
            {{ genProjectId }}
          </span>
          <div class="txt-name">
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
          </div>
        </div>
      </div>

      <div class="page-label btn-submit">
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
      </div>
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
    ...mapActions(["getEmployees", "saveProject"]),
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
      let retProjId = 101;
      retProjId = this.projectId || retProjId;
      const storeProjList = this.$store.state.projectList;
      if (storeProjList.length > 0 && retProjId === 101) {
        retProjId = Math.max(...storeProjList.map((m) => m.id)) + 1;
      }

      return retProjId;
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40rem;
  margin-left: 30rem;
}
.all-form {
  height: 100vh;
  background-color: beige;
}
.page-label {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
.page-data {
  display: flex;
  justify-content: space-around;
}
label {
  display: flex;
  width: 10rem;
}
span {
  display: flex;
}
.btn-submit {
  margin-left: 1rem;
}
.btn-submit > input {
  height: 2rem;
}
.txt-name input {
  width: 30rem;
}
.txt-name select {
  display: flex;
  height: 10rem;
  width: 10rem;
}
</style>

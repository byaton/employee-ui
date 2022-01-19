<template>
  <div class="about">
    <table>
      <thead>
        <th :key="index" v-for="(pc, index) in projectColumns">{{ pc }}</th>
      </thead>
      <tbody>
        <tr
          @click="onProjectSelect(project)"
          :key="idProj"
          v-for="(project, idProj) in storeProjectList"
        >
          <td :key="idPc" v-for="(pc, idPc) in projectColumns">
            {{ project[pc] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      projectColumns: ["id", "name", "description", "date", "empIds"],
      storeProjectList: this.$store.state.projectList,
    };
  },
  methods: {
    ...mapActions(["getProjects"]),
    onProjectSelect: (project) => {
      router.push({
        name: "CreateProject",
        params: {
          projectId: project.id,
          projectName: project.name,
          projectDescription: project.description,
          projectStartDate: project.date,
          projectEmployees: project.empIds,
        },
      });
    },
  },
  mounted() {
    if (this.$store.state.projectList.length === 0) {
      this.$store.dispatch("getProjects");
    }
  }
};
</script>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>

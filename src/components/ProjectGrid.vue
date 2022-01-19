<template>
  <div class="all-form">
    <div class="project-data">
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
  },
};
</script>

<style scoped>
.all-form {
  height: 100vh;
  background-color: beige;
}

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

.project-data {
  margin-left: 25rem;
}
</style>

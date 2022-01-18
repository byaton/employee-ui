import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      empList: [],
      projectList: [],
    };
  },
  mutations: {
    addToEmpList(state, payload) {
      state.empList = payload;
    },
    addToProjectList(state, payload) {
      state.projectList = payload;
    },
  },
  actions: {
    async getEmployees(context) {
      const empData = await axios.get("http://localhost:3000/employees");
      console.log("Amit9", empData.data);
      context.commit("addToEmpList", empData.data);
    },
    async getProjects(context) {
      const projectData = await axios.get("http://localhost:3000/projects");
      console.log("Amit10", projectData.data);
      context.commit("addToProjectList", projectData.data);
    },
    async saveEmployee(context, emp) {
      const storeEmpList = context.state.empList;
      const empData = {
        id: emp.id,
        name: emp.name,
      };
      console.log("Amit11", emp);
      storeEmpList.push(empData);
      await axios.post("http://localhost:3000/employees", empData);
      context.commit("addToEmpList", storeEmpList);
    },
    async saveProject(context, project) {
      const storeProjectList = context.state.projectList;
      console.log("Amit13", project);
      const projectData = {
        id: project.id,
        name: project.name,
        description: project.description,
        date: project.date,
        empIds: project.empIds,
      };
      storeProjectList.push(projectData);
      await axios.post("http://localhost:3000/projects", projectData);
      context.commit("addToProjectList", storeProjectList);
    },
    async updateEmployee(context, emp) {
      const storeEmpList = context.state.empList;
      const empData = {
        name: emp.name,
      };
      const empToUpdate = storeEmpList.find((f) => f.id === emp.id);
      empToUpdate.name = emp.name;

      await axios.patch(`http://localhost:3000/employees/${emp.id}`, empData);
      context.commit("addToEmpList", storeEmpList);
    },
    async updateProject(context, project) {
      const storeProjectList = context.state.projectList;
      const projectData = {
        name: project.name,
        description: project.description,
        date: project.date,
        empIds: project.empIds,
      };

      const projectToUpdate = storeProjectList.find((f) => f.id === project.id);
      projectToUpdate.name = project.name;
      projectToUpdate.description = project.description;
      projectToUpdate.date = project.date;
      projectToUpdate.empIds = project.empIds;

      await axios.patch(
        `http://localhost:3000/projects/${project.id}`,
        projectData
      );
      context.commit("addToProjectList", storeProjectList);
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");

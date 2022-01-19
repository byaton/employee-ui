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
      context.commit("addToEmpList", empData.data);
    },
    async getProjects(context) {
      const projectData = await axios.get("http://localhost:3000/projects");
      context.commit("addToProjectList", projectData.data);
    },
    async saveEmployee(context, emp) {
      const storeEmpList = context.state.empList;
      const empData = {
        name: emp.name,
      };

      if (emp.isUpdate) {
        const empToUpdate = storeEmpList.find(
          (f) => f.id.toString() === emp.id.toString()
        );
        empToUpdate.name = emp.name;

        await axios.patch(`http://localhost:3000/employees/${emp.id}`, empData);
      } else {
        empData.id = emp.id;
        storeEmpList.push(empData);
        await axios.post("http://localhost:3000/employees", empData);
      }

      context.commit("addToEmpList", storeEmpList);
    },
    async saveProject(context, project) {
      const storeProjectList = context.state.projectList;
      const projectData = {
        name: project.name,
        description: project.description,
        date: project.date,
        empIds: project.empIds,
      };

      if (project.isUpdate) {
        const projectToUpdate = storeProjectList.find(
          (f) => f.id.toString() === project.id.toString()
        );
        projectToUpdate.name = project.name;
        projectToUpdate.description = project.description;
        projectToUpdate.date = project.date;
        projectToUpdate.empIds = project.empIds;

        await axios.patch(
          `http://localhost:3000/projects/${project.id}`,
          projectData
        );
      } else {
        projectData.id = project.id;
        storeProjectList.push(projectData);
        await axios.post("http://localhost:3000/projects", projectData);
      }

      context.commit("addToProjectList", storeProjectList);
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");

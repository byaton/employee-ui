import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/employee",
    name: "Employee",
    component: () => import("../views/Employees.vue"),
  },
  {
    path: "/project",
    name: "Project",
    component: () => import("../views/Projects.vue"),
  },
  {
    path: "/createemployee",
    name: "CreateEmployee",
    props: true,
    component: () => import("../views/CreateEmployee.vue"),
  },
  {
    path: "/createproject",
    name: "CreateProject",
    props: true,
    component: () => import("../views/CreateProject.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

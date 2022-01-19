<template>
  <div class="all-form">
    <div class="employee-data">
      <table>
        <thead>
          <th :key="index" v-for="(ec, index) in employeeColumns">{{ ec }}</th>
        </thead>
        <tbody>
          <tr
            @click="onEmployeeSelect(employee)"
            :key="idEmp"
            v-for="(employee, idEmp) in storeEmpList"
          >
            <td :key="idEc" v-for="(ec, idEc) in employeeColumns">
              {{ employee[ec] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";

export default {
  data() {
    return {
      storeEmpList: this.$store.state.empList,
      employeeColumns: ["id", "name"],
    };
  },
  methods: {
    onEmployeeSelect: (emp) => {
      router.push({
        name: "CreateEmployee",
        params: {
          employeeId: emp.id,
          employeeName: emp.name,
        },
      });
    },
  },
  computed: {
    ...mapState["empList"],
  },
  mounted() {
    if (this.$store.state.empList.length === 0) {
      this.$store.dispatch("getEmployees");
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

.employee-data {
  margin-left: 41rem;
}
</style>

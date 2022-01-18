<template>
  <div class="about">
    <div class="employee-data">
      <table>
        <!-- <thead>
          <tr>
            <th
              v-for="(ec, index) in employeeColumns"
              @click="sortBy(ec)"
              :key="index"
              :class="{ active: sortKey == ec }"
            >
              {{ ec }}
              <span class="arrow" :class="sortOrders[ec] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead> -->
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
      employees: [
        { id: 1, name: "Amit1" },
        { id: 2, name: "Amit2" },
        { id: 3, name: "Amit3" },
        { id: 4, name: "Amit4" },
        { id: 5, name: "Amit5" },
      ],
      storeEmpList: this.$store.state.empList,
      employeeColumns: ["id", "name"],
    };
  },
  methods: {
    onEmployeeSelect: (emp) => {
      console.log("Amit1", emp.id, emp.name);
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

/* .employee-data {
  min-height: 5rem;
  min-width: 5rem;
} */

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

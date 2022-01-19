<template>
  <div class="all-form">
    <h1>This is a create Employee page</h1>
    <form>
      <div class="page-data">
        <div class="page-label">
          <label>Employee ID</label>
          <label>Full Name</label>
        </div>
        <div class="page-label">
          <span>{{ genEmpId }}</span>
          <div class="txt-name">
            <input type="text" placeholder="FullName" v-model="eName" />
          </div>
        </div>
      </div>
      <div class="page-label btn-submit">
        <input
          type="button"
          :disabled="enableStatus"
          :value="buttonText"
          @click="
            saveEmployee({
              id: genEmpId,
              name: eName,
              isUpdate,
            })
          "
        />
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      eName: this.employeeName,
      emplName: "",
      buttonText: this.employeeId ? "Update" : "Submit",
      isUpdate: !!this.employeeId,
    };
  },
  methods: {
    ...mapActions(["saveEmployee", "getEmployees"]),
  },
  props: ["employeeId", "employeeName"],
  mounted() {
    if (this.$store.state.empList.length === 0) {
      this.$store.dispatch("getEmployees");
    }
  },
  computed: {
    ...mapState["empList"],
    enableStatus() {
      return (
        !this.genEmpId ||
        !this.eName ||
        this.eName.length < 3 ||
        this.eName.length > 60
      );
    },
    genEmpId() {
      let retEmpId = 101;
      retEmpId = this.employeeId || retEmpId;
      const storeEmpList = this.$store.state.empList;
      if (storeEmpList.length > 0 && retEmpId === 101) {
        retEmpId = Math.max(...storeEmpList.map((m) => m.id)) + 1;
      }

      return retEmpId;
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
.txt-name > input {
  width: 30rem;
}
</style>

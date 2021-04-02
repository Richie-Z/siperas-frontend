<template>
  <breadcrumb-vue current-page="Data Petugas"></breadcrumb-vue>
  <h1 class="m-7 font-semibold text-3xl">Data Petugas</h1>
  <div class="contentBx m-7">
    <table-vue
      name="Petugas"
      :column="column"
      :row="row"
      :isAddable="true"
      :isEditable="true"
    />
  </div>
</template>

<script>
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
import TableVue from "../../../components/Table.vue";
import Api from "@/Api";
export default {
  components: {
    BreadcrumbVue,
    TableVue,
  },
  props: ["query"],
  data() {
    return {
      column: [
        { name: "Nama Petugas", rowModel: "nama_petugas" },
        { name: "Username", rowModel: "username" },
        { name: "Level", rowModel: "level" },
      ],
      row: {},
    };
  },
  methods: {
    getPetugas() {
      Api.getData("petugas").then((data) => (this.row = data.data));
    },
  },
  watch: {
    query() {
      this.getPetugas();
    },
  },
  mounted() {
    Api.tokenChecker();
    this.getPetugas();
  },
};
</script>

<style>
</style>
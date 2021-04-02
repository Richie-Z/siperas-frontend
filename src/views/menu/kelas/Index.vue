<template>
  <breadcrumb-vue current-page="Data Kelas" />
  <h1 class="m-7 font-semibold text-3xl">Data Kelas</h1>
  <div class="contentBx m-7">
    <table-vue
      name="Kelas"
      :column="column"
      :row="row"
      :isAddable="true"
      :isEditable="true"
      deleteMessageModel="kelas"
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
        { name: "Kelas", rowModel: "kelas" },
        { name: "Kompetensi", rowModel: "kompetensi_keahlian" },
      ],
      row: {},
    };
  },
  methods: {
    getKelas() {
      Api.getData("kelas").then((data) => (this.row = data.data));
    },
  },
  watch: {
    query() {
      this.getKelas();
      this.$router.push({ name: "kelas" });
    },
  },
  mounted() {
    Api.tokenChecker();
    this.getKelas();
  },
};
</script>

<style>
</style>